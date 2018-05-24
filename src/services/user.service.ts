import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {User, UserEvents} from "../models/user.model";
import {Device} from "@ionic-native/device";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {SecurityUtil} from "../utils/security-util";
import {SecurityUserData} from "../models/security-user-data.model";
import {Modal, ModalController, ModalOptions} from "ionic-angular";

@Injectable()
export class UserService{

  private static BEEVY_USER_BASE_URL = AppConfig.API_BASE_URL + "/user";

  constructor(private storage: Storage,
              private device: Device,
              private http: HttpClient,
              private modalCtrl: ModalController){}

  handleUser(){
    return this.checkIfUserExists()
      .then((userExists: boolean) => {
          if(userExists) {
            console.log("User exists!")
          } else {
            this.createUser();
          }
        })
  }


  getUserEvents(user: User) {
    let userAccessData: SecurityUserData =  this.generateUserAccessData(user);
      this.http.post(UserService.BEEVY_USER_BASE_URL + "/access", userAccessData)
        .subscribe(() => {
          this.http.get(AppConfig.API_BASE_URL + "/event/" + user.userID + "/" + userAccessData.tempToken)
            .subscribe((userEvents: UserEvents) => {
              console.log("userEvents:", userEvents)
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
          if(!user || !(user.token && user.userID)){
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => reject(err));
    })
  }

  private createUser() {
    return new Promise((resolve, reject) => {
      let user: User = this.createUserData();
      this.openRegistrationPage();
      resolve();
 /*     this.createUserOnServer(user)
        .then((token: string) => {
          user.token = token;
          this.storage.set("user", user);
          //TODO: FIND A BETTER WAY TO GET USER EVENTS WHEN A USER DOES A FRESH INSTALL SO THIS ISN'T CALLED ON EVERY APP START
/!*          this.getUserEvents(user)
            .then((userEvents: UserEvents) => {
              user.userEvents  = userEvents;
              this.storage.set("user", user)
                .then(() => resolve());
            })*!/
        }).catch((err) => {
          console.error(err);
          reject();
      });*/
    })
  }

  private openRegistrationPage() {
    const registrationModalOption = {
      cssClass: "registrationModal",
      showBackdrop: false
    }
    const registrationModal: Modal = this.modalCtrl.create("FilterModalPage", {}, registrationModalOption);
    registrationModal.present();
    registrationModal.onWillDismiss((registrationData) => {
    })
  }

  private createUserData() {
    return {
      username: "TestUser",
      userID: this.device.uuid ? this.device.uuid : "testID",
      mail: "test@test.com"
    }
  }

  private createUserOnServer(user: User){
    let userAccessData: SecurityUserData = this.generateUserAccessData(user);
    return new Promise(((resolve, reject) => {
      this.http.post(UserService.BEEVY_USER_BASE_URL, user)
        .subscribe(() => {
          this.http.post(UserService.BEEVY_USER_BASE_URL + "/access", userAccessData)
            .subscribe(() => {
              this.http.get(UserService.BEEVY_USER_BASE_URL + "/" + user.username + "/" + user.userID + "/" + userAccessData.tempToken)
                .subscribe((securityToken: any) => {
                  console.log(securityToken.token)
                  resolve(securityToken.token);
                })
            })
        }, err => {
          reject();
          console.error("failed to create user")
        })
    }))
  }

  private generateUserAccessData(user: User): SecurityUserData {
    return {
      username: user.username,
      userID: user.userID,
      tempToken: SecurityUtil.generateRandomToken()
    };
  }
}
