import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {User} from "../models/user.model";
import {Device} from "@ionic-native/device";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService{

  constructor(private storage: Storage,
              private device: Device,
              private http: HttpClient){}

  handleUser(){
    this.checkIfUserExists()
      .then((userExists: boolean) => {
        if(userExists) {
          //check if token is available
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
          user ? resolve(true) : resolve(false);
        })
        .catch(err => reject(err));
    })
  }

  private createUser() {
    /*  1. lokal User anlegen mit Username + UUID
      * 2. Server schicken
      * 3. Schauen ob user bereits existiert (UUID = device ID = immer gleich), falls ja User holen und Daten zurück schicken
      * 3. Falls nicht, Token generieren, User+Token abspeichern
      * 4. token zurück schicken
      * 5. User + token speichern
    */
    return new Promise((resolve, reject) => {
      let user: User = this.createUserData();
      this.handleUserOnServerSide(user);
      resolve();
    })
  }

  private createUserData() {
    return {
      name: "TestUser",
      userID: this.device.uuid,
      mail: "test@test.com"
    }
  }

  private handleUserOnServerSide(user: User){
    console.log(user);
  }
}
