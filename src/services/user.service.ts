import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {UnregisteredUser, User, UserEvents} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {SecurityUserData} from "../models/security-user-data.model";
import {Modal, ModalController} from "ionic-angular";
import {SecurityUtil} from "../utils/security-util";

@Injectable()
export class UserService {

  private static BEEVY_USER_BASE_URL = AppConfig.API_BASE_URL + "/user";

  constructor(private storage: Storage,
              private http: HttpClient,
              private modalCtrl: ModalController) {
  }

  checkForUserStateAndHandleRegistration(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.checkIfUserExists()
        .then((userExists: boolean) => {
          if(userExists)
            resolve();
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
          if (!user || !(user.token && user.userID)) {
            resolve(false);
          } else {
            console.log(user);
            resolve(true);
          }
        })
        .catch(err => reject(err));
    })
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
}
