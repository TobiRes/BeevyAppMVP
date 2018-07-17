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

  nameTooLong() {
    let toast = this.toastCtrl.create({
      message: 'Dein Name darf höchstens 15 Buchstaben lang sein',
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
    toast.present();
  }

  commentTooLong(commentLengthTooMuch: number) {
    let toast = this.toastCtrl.create({
      message: 'Dein Kommentar ist leider ' + commentLengthTooMuch + " Zeichen zu lang.",
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  reportedEvent(){
    let toast = this.toastCtrl.create({
      message: 'Vielen Dank. Das Beevy-Team wird sich das gemeldete Event anschauen und gegebenenfalls löschen.',
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }

  leftEvent(eventTitle: string){
    let toast = this.toastCtrl.create({
      message: 'Du hast das "'+ eventTitle +'" verlassen.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  copiedID(eventTitle: string){
    let toast = this.toastCtrl.create({
      message: 'Du hast die ID von "'+ eventTitle +'" kopiert. Deine Freunde können damit das Event in der Suchfunktion finden!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  tagsTooLong() {
    let toast = this.toastCtrl.create({
      message: 'Achte darauf, dass deine Tags eine sinnvolle Länge haben und du nicht mehr als 10 hinzugefügt hast.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
