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
  showSecurityHint: boolean = true;
  privacyPolicyAccept: boolean = false;
  registrationProcess: boolean = false;
  enterConfirmationCode: boolean = false;
  failedRegistration: boolean = false;
  registrationCode: string;
  private unregisteredUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private userService: UserService,
              private loadingCtrl: LoadingController,
              private storage: Storage,
              private toastService: ToastService) {
    this.reenterLastRegistrationState();
  }

  startRegistration() {
    this.showSecurityHint = false;
    this.registrationProcess = true;
    this.saveCurrentRegistrationState();
    /*if (this.validateData()) {
      this.viewCtrl.dismiss({username: this.name, mail: this.email})
    }*/
  }

  saveCurrentRegistrationState(){
    this.storage.set("registrationState", {
      showSecurityHint: this.showSecurityHint,
      registrationProcess: this.registrationProcess,
      enterConfirmationCode: this.enterConfirmationCode,
      failedRegistration: this.failedRegistration,
      uregisteredUser: this.unregisteredUser,
      email: this.email,
      name: this.name
    });
  }

  reenterLastRegistrationState(){
    this.storage.get("registrationState")
      .then((registrationState: any) => {
        if(registrationState){
          this.showSecurityHint = registrationState.showSecurityHint;
          this.registrationProcess = registrationState.registrationProcess;
          this.enterConfirmationCode = registrationState.enterConfirmationCode;
          this.failedRegistration = registrationState.failedRegistration;
          this.unregisteredUser = registrationState.uregisteredUser;
          this.email = registrationState.email;
          this.name = registrationState.name;
        }
      })
  }

  register() {
    if(this.validateData()){
      let loadingSpinner = this.createSpinner();
      loadingSpinner.present();
      this.userService.registerUserOnServer(this.name, this.email)
        .then((unregisteredUser: User) => {
          this.unregisteredUser = unregisteredUser;
          this.registrationProcess = false;
          this.enterConfirmationCode = true;
          this.saveCurrentRegistrationState();
          loadingSpinner.dismissAll();
        })
        .catch((err) => {
          this.enterConfirmationCode = false;
          this.saveCurrentRegistrationState();
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
        this.enterConfirmationCode = false;
        this.storage.set("user", registeredUser);
        loadingSpinner.dismissAll();
        this.toastService.successfullyRegistered(registeredUser.username);
        this.viewCtrl.dismiss();
      })
      .catch(err => {
        //TODO: Wrap in Methods "showScreenXXX()"
        //TODO: Handle lowercase
        //TODO: Jump Back in registration process
        this.enterConfirmationCode = false;
        this.failedRegistration = true;
        this.saveCurrentRegistrationState();
        console.error(err);
        loadingSpinner.dismissAll();
      })
  }

  reenterCode(){
    this.failedRegistration = false;
    this.enterConfirmationCode = true;
  }

  restartRegistration(){
    this.failedRegistration = false;
    this.registrationProcess = true;
    this.enterConfirmationCode = false;
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
