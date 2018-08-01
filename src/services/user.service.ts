import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {UnregisteredUser, User, UserEvents} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {SecurityUserData} from "../models/security-user-data.model";
import {AlertController, Modal, ModalController} from "ionic-angular";
import {SecurityUtil} from "../utils/security-util";

@Injectable()
export class UserService {

  private static BEEVY_USER_BASE_URL = AppConfig.API_BASE_URL + "/user";

  constructor(private storage: Storage,
              private http: HttpClient,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {
  }


  showAlertWhenTheAppIsLaunchedForTheFirstTime() {
    return new Promise(((resolve, reject) => {
      this.storage.get("alreadyUsed")
        .then((alreadyUsed: boolean) =>{
          if(alreadyUsed){
            resolve();
          } else {
            this.presentFirstTimeAlert()
              .then(() => this.storage.set("alreadyUsed", true))
              .then(() => resolve())
              .catch((err) => reject(err))
          }
        })
    }))
  }

  presentFirstTimeAlert(){
    return new Promise((resolve => {
      let alert = this.alertCtrl.create({
        title: 'Hallo!',
        message: '<p>Wir freuen uns, dass du unsere App installiert hast! Die App wurde für Studierende der Hochschule Offenburg enwtickelt.' +
        ' Sie befindet sich noch am Anfang der Entwicklung, weswegen Fehler vorkommen können. Wir arbeiten weiter an der Verbesserung, hab Geduld mit uns!<br><br>' +
        'Falls du Verbesserungsvorschläge oder Feedback hast, kannst du gerne eine E-mail an tobias.reski@gmail.com schicken!',
        buttons: [
          {
            text: 'Alles klar',
            role: 'cancel',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      alert.present();
    }))
  }

  checkForUserStateAndHandleRegistration(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.checkIfUserExists()
        .then((userExists: boolean) => {
          if(userExists)
              resolve()
          else{
            this.handleUserRegistration()
              .then(() => {
                resolve();
              })
              .catch((err)=> reject(err))
          }
        })
        .catch((err) => reject(err))
    })
  }

  registerUserOnServer(username: string, mail: string): Promise<User> {
    return new Promise(((resolve, reject) => {
      let newUser: User = this.createTemporaryUserData(username,mail);
      this.http.post(UserService.BEEVY_USER_BASE_URL + "/register", newUser)
        .subscribe(() => resolve(newUser), err => reject(err))
    }))
  }

  confirmRegistrationOnServer(newUser: User, token: string) {
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

  private createTemporaryUserData(username: string, mail: string): UnregisteredUser {
    return {
      username: username,
      userID: SecurityUtil.generateRandomToken(),
      mail: mail,
      currentAvatar: "avatar_1",
    }
  }

  private handleUserRegistration(): Promise<any> {
    return new Promise<any>((resolve) => {
      const registrationModalOption = {
        cssClass: "registrationModal",
        showBackdrop: false
      }
      const registrationModal: Modal = this.modalCtrl.create("RegistrationModalPage", {}, registrationModalOption);
      registrationModal.present();
      registrationModal.onWillDismiss(() => {
          resolve();
      })
    })
  }

  getUserEvents(user: User) {
    return new Promise(((resolve, reject) => {
      let userAccessData: SecurityUserData = SecurityUtil.generateUserAccessData(user);
      this.http.post(UserService.BEEVY_USER_BASE_URL + "/access", userAccessData)
        .subscribe(() => {
          this.http.get(AppConfig.API_BASE_URL + "/event/" + user.userID + "/" + userAccessData.tempToken)
            .subscribe((userEvents: UserEvents) => {
              let updatedUser: User = user;
              updatedUser.userEvents = userEvents;
              this.storage.set("user", updatedUser)
                .then(() => resolve(updatedUser))
                .catch(() => reject());
            }, err => {
              console.error(err);
              reject();
            });
        })
    }))
  }

  checkIfUserExists(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.get("user")
        .then((user: User) => {
          console.log(user);
          if (!user || !(user.token && user.userID)) {
            resolve(false);
          } else {
            this.checkIfUserExistsInBackend(user.userID)
              .then(() => resolve(true))
              .catch(() => {
                this.resetCurrentRegistrationState();
                resolve(false);
              })
          }
        })
        .catch(err => reject(err));
    })
  }

  private resetCurrentRegistrationState(){
    this.storage.set("registrationState", {
      showSecurityHint: true,
      privacyPolicyAccept: false,
      registrationProcess: false,
      enterConfirmationCode: false,
      failedRegistration: false,
      uregisteredUser: null,
      email: "",
      name: ""
    });
  }

  updateUserAvatar(user: User) {
    let avatarDTO = {
      userID: user.userID,
      token: user.token,
      avatar: user.currentAvatar
    }
    this.http.post(UserService.BEEVY_USER_BASE_URL + "/avatar", avatarDTO)
      .subscribe(() => console.log("success"));
  }

  private checkIfUserExistsInBackend(userID: string): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      this.http.get(UserService.BEEVY_USER_BASE_URL + "/state/" + userID)
        .subscribe(() => resolve()
        ,() => reject())
    }))
  }
}
