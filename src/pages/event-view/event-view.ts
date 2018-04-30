import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BeevyEvent} from "../../models/event.model";
import {Storage} from "@ionic/storage";
import {User} from "../../models/user.model";
import {MockService} from "../../services/mock.service";

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  beevyEvent: BeevyEvent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alertCtrl: AlertController,
              private mockService: MockService) {
    this.beevyEvent = this.navParams.get("beevyEvent");
  }

  ionViewDidLoad() {
  }

  joinEvent() {
    this.mockService.checkIfUserExists()
      .then((user: User) => {
        if (!user) {
          this.mockService.createMockUser()
            .then(() => {
              this.joinEvent()
            })
        } else {
          if (!user.userProfile.joinedEvents) {
            user.userProfile.joinedEvents = [this.beevyEvent]
          } else {
            user.userProfile.joinedEvents.push(this.beevyEvent);
          }
          this.saveUpdatedUser(user);
        }
      })
      .catch(() => {

      })
  }

  private saveUpdatedUser(user: User) {
    this.storage.set("user", user)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: 'Event beigetreten',
          subTitle: 'Du nimmst jetzt an diesem Event teil!',
          buttons: ['OK']
        });
        alert.present();
      })
  }
}
