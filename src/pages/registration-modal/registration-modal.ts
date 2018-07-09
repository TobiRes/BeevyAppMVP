import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-registration-modal',
  templateUrl: 'registration-modal.html',
})
export class RegistrationModalPage {

  name: string = "";
  email: string = "";
  privacyPolicyAccept: boolean = false;
  registrationProcess: boolean = false;
  enterConfirmationCode: boolean = false;
  registrationCode: string;
  private unregisteredUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private userService: UserService,
              private loadingCtrl: LoadingController,
              private storage: Storage,
              private toastService: ToastService) {
  }

  startRegistration() {
    this.registrationProcess = true;
    /*if (this.validateData()) {
      this.viewCtrl.dismiss({username: this.name, mail: this.email})
    }*/
  }

  register() {
    if(this.validateData()){
      let loadingSpinner = this.createSpinner();
      loadingSpinner.present();
      this.userService.registerUserOnServer(this.name, this.email)
        .then((unregisteredUser: User) => {
          this.unregisteredUser = unregisteredUser;
          this.enterConfirmationCode = true;
          loadingSpinner.dismissAll();
        })
        .catch((err) => {
          this.enterConfirmationCode = false;
          loadingSpinner.dismissAll();
          console.log(err);
        })
    }
  }

  confirmRegistration(){
    let loadingSpinner = this.createSpinner();
    loadingSpinner.present();
    this.userService.confirmRegistrationOnServer(this.unregisteredUser, this.registrationCode)
      .then((registeredUser: User) => {
        this.storage.set("user", registeredUser);
        loadingSpinner.dismissAll();
      })
      .catch(err => {
        //TODO: "Da ist was schief gelaufen! Nochmal versuchen"
        //TODO: Resend Code
        //TODO: Handle Interrupted Registration
        console.error(err);
        loadingSpinner.dismissAll();
      })
  }

  isDisabled() {
    return this.name.length == 0 || this.email.length == 0 || this.email.indexOf("@") < 0;
  }

  private validateData(): boolean {
    //TODO: Check if username already exists
    if (this.name.length < 3) {
      this.toastService.nameNotLongEnough();
      return false;
    } else if (this.email.indexOf("@stud.hs-offenburg.de") < 0 && this.email.indexOf("@hs-offenburg.de") < 0) {
      this.toastService.wrongEmail();
      return false;
    }
    return true;
  }

  private createSpinner() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
    });
  }
}
