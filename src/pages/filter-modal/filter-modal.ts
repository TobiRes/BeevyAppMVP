import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    let test1 = this.navParams.get("test1");
    let test2 = this.navParams.get("test2");

  }

  applyFilter() {
    this.viewCtrl.dismiss();
  }

}
