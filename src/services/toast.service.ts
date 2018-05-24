import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {
  }

  nameNotLongEnough() {
    let toast = this.toastCtrl.create({
      message: 'Dein Name muss mindestens 3 Buchstaben lang sein.',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  wrongEmail() {
    let toast = this.toastCtrl.create({
      message: 'Bitte nutze eine korrekte HS-Offenburg Email.',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
