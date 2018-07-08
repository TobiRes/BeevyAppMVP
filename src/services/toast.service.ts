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

  successfullyRegistered(username: string) {
    let toast = this.toastCtrl.create({
      message: 'Du hast dich erfolgreich registriert, ' + username + "!",
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  filtersResetted() {
    let toast = this.toastCtrl.create({
      message: 'Filter wurden zurückgesetzt',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  filtersChanged() {
    let toast = this.toastCtrl.create({
      message: 'Events wurden gefiltert',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  eventTitleTooLong(tooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Der Titel deines Events ist ' + tooMuch + ' Zeichen zu lang',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  eventSummaryTooLong(tooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Die Zusammenfassung deines Events ist ' + tooMuch + ' Zeichen zu lang',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  eventDescriptionTooLong(tooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Die Beschreibung deines Events ist ' + tooMuch + ' Zeichen zu lang',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  eventStreetTooLong(tooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Die Strasse ist ' + tooMuch + ' Zeichen zu lang',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }


  eventCityTooLong(tooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Der Ort ist ' + tooMuch + ' Zeichen zu lang',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  eventNotValid() {
    let toast = this.toastCtrl.create({
      message: 'Deine Eingaben sind nicht gültig',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  notComplete() {
    let toast = this.toastCtrl.create({
      message: 'Bitte fülle alle Felder aus',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  zipNotCorrect() {
    let toast = this.toastCtrl.create({
      message: 'Bitte gib eine korrekte PLZ ein',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  eventDataTooShort() {
    let toast = this.toastCtrl.create({
      message: 'Bitte achte darauf, dass deine Eingaben aussagekräftig sind',
      duration: 2000,
    })
  }

  commentTooLong(commentLengthTooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Dein Kommentar ist leider ' + commentLengthTooMuch + " Zeichen zu lang.",
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
