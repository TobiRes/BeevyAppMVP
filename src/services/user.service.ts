import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {User, UserEvents} from "../models/user.model";
import {Device} from "@ionic-native/device";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {SecurityUserData} from "../models/security-user-data.model";
import {AlertController, Modal, ModalController} from "ionic-angular";
import {ToastService} from "./toast.service";
import {SecurityUtil} from "../utils/security-util";

@Injectable()
export class UserService {

  private static BEEVY_USER_BASE_URL = AppConfig.API_BASE_URL + "/user";

  constructor(private storage: Storage,
              private device: Device,
              private http: HttpClient,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastService: ToastService) {
  }

  handleUser() {
    this.checkIfUserExists()
      .then((userExists: boolean) => {
        if (userExists) {
          console.log("User exists!")
        } else {
          this.createUser()
            .then((username: string) => this.toastService.successfullyRegistered(username))
            .catch(err => console.error(err));
        }
      })
  }

  getUserEvents(user: User) {
    let userAccessData: SecurityUserData = this.generateUserAccessData(user);
    this.http.post(UserService.BEEVY_USER_BASE_URL + "/access", userAccessData)
      .subscribe(() => {
        this.http.get(AppConfig.API_BASE_URL + "/event/" + user.userID + "/" + userAccessData.tempToken)
          .subscribe((userEvents: UserEvents) => {
            let updatedUser: User = user;
            updatedUser.userEvents = userEvents;
            this.storage.set("user", updatedUser);
          }, err => console.error(err));
      })
  }

  checkIfUserExists(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.get("user")
        .then((user: User) => {
          if (!user || !(user.token && user.userID)) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => reject(err));
    })
  }

  private createUser(): Promise<string> {
    //TODO: Save state, so if the user cancels but an email was already sent they can go right here
    //TODO: Make it possible to resend email. Maybe handle in .catch down below
    //TODO: What if is already in use?
    //TODO: What if wrong token?

    return new Promise((resolve, reject) => {
      let user: User;
      this.openRegistrationPage()
        .then(registrationData => this.registerUser(registrationData))
        .then((newUser: User) => {
          user = newUser;
          return this.confirmRegistration()
        })
        .then((token: any) => this.confirmRegistrationWithServer(user, token.token))
        .then((user: User) => {
          this.storage.set("user", user);
          resolve(user.username);
        })
        .catch(err => reject(err))

    })
  }

  private openRegistrationPage(): Promise<any> {
    return new Promise((resolve, reject) => {
      const registrationModalOption = {
        cssClass: "registrationModal",
        showBackdrop: false
      }
      const registrationModal: Modal = this.modalCtrl.create("RegistrationModalPage", {}, registrationModalOption);
      registrationModal.present();
      registrationModal.onWillDismiss((registrationData) => {
        if (registrationData) {
          resolve(registrationData);
        } else {
          reject("Canceled registration!");
        }
      })
    })
  }

  private registerUser(registrationData: any): Promise<User> {
    return new Promise(((resolve, reject) => {
      let newUser: User = this.createUserData(registrationData);
      this.http.post(UserService.BEEVY_USER_BASE_URL + "/register", newUser)
        .subscribe(() => resolve(newUser), err => reject(err))
    }))
  }

  private createUserData(registrationData: any): User {
    return {
      username: registrationData.username,
      userID: this.device.uuid ? this.device.uuid : "1104",
      mail: registrationData.mail
    }
  }

  private confirmRegistration(): Promise<string> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Registrierung',
        inputs: [
          {
            name: 'token',
            placeholder: 'Registrierungs-Code'
          },
        ],
        buttons: [
          {
            text: 'Abbrechen',
            role: 'cancel',
            handler: () => {
              reject("Canceled confirmation");
            }
          },
          {
            text: 'Login',
            handler: (token) => {
              if (token) {
                resolve(token);
              } else {
                reject("No data entered in confirmation");
              }
            }
          }
        ]
      });
      alert.present();
    })
  }

  private confirmRegistrationWithServer(newUser: User, token: string) {
    return new Promise((resolve, reject) => {
      this.http.get(UserService.BEEVY_USER_BASE_URL + "/" + newUser.username + "/" + newUser.userID + "/" + token)
        .subscribe((userToken: any) => {
          newUser.token = userToken.token;
          resolve(newUser);
        }, err => {
          reject(err);
        })
    })
  }

  private generateUserAccessData(user: User): SecurityUserData {
    return {
      username: user.username,
      userID: user.userID,
      token: user.token,
      tempToken: SecurityUtil.generateRandomToken()
    }
  }
}
