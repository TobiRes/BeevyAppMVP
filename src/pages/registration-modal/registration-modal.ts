import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";


@IonicPage()
@Component({
  selector: 'page-registration-modal',
  templateUrl: 'registration-modal.html',
})
export class RegistrationModalPage {

  name: string = "";
  email: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private toastService: ToastService) {
  }

  register() {
    if (this.validateData()) {
      this.viewCtrl.dismiss({username: this.name, mail: this.email})
    }
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

}