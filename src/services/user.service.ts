import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {User} from "../models/user.model";

@Injectable()
export class UserService{

  constructor(private storage: Storage){}

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
    /*  1. lokal User anlegen mit Username + UUID, in Zukunft über Mail handlen, falls Storage probleme macht damit ein User nicht mehrmals angelegt wird und seine Events verliert
      * 2. Server schicken
      * 3. Token generieren, User+Token abspeichern
      * 4. token zurück schicken
      * 5. User + token speichern
    */
    return new Promise((resolve, reject) => {
      let user: User = this.createUserData();

    })
  }

  private createUserData() {
    return {
      name: "TestUser",
      userID: "test",
      mail: "test@test.com"
    }
  }
}
