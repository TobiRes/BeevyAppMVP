import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {User} from "../models/user.model";
import {Device} from "@ionic-native/device";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app-config";
import {BeevyEvent} from "../models/event.model";

@Injectable()
export class UserService{

  private static BEEVY_USER_BASE_URL = AppConfig.API_BASE_URL + "/user";

  constructor(private storage: Storage,
              private device: Device,
              private http: HttpClient){}

  handleUser(){
    this.checkIfUserExists()
      .then((userExists: boolean) => {
        if(userExists) {
          console.log("User exists!")
        } else {
          this.createUser();
        }
      })
  }

  private checkIfUserExists(): Promise<boolean> {
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
      this.handleUserOnServerSide(user)
        .then((token: string) => {
          user.token = token;
          return this.storage.set("user", user)
            .then(() => resolve())
        }).catch((err) => {
          console.error(err);
          reject();
      });
    })
  }

  private createUserData() {
    return {
      username: "TestUser",
      userID: this.device.uuid ? this.device.uuid : "testID",
      mail: "test@test.com",
      currentAvatar: ""
    }
  }

  private handleUserOnServerSide(user: User){
    return new Promise(((resolve, reject) => {
      this.http.post(UserService.BEEVY_USER_BASE_URL, user)
        .subscribe(() => {
          this.http.get(UserService.BEEVY_USER_BASE_URL + "/" + user.username + "/" + user.userID)
            .subscribe((securityToken: any) => {
              console.log(securityToken.token)
              resolve(securityToken.token);
            })
        }, err => {
          reject();
          console.error("failed to create user")
        })
    }))
  }
}
