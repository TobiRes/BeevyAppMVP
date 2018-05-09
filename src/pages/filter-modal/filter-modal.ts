import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SetFilters} from "../../models/setFilters.model";


@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  type: string;
  typeProject: boolean = true;
  typeActivity: boolean = true;
  typeHangout: boolean = true;
  filter: SetFilters = {types: []};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    let test1 = this.navParams.get("test1");
    let test2 = this.navParams.get("test2");

  }

  applyFilter() {
    this.applyTypeFilter();
    this.viewCtrl.dismiss(this.filter);
  }

  applyTypeFilter(){
    if(this.typeProject) this.filter.types[0] = true; else this.filter.types[0] = false;
    if(this.typeActivity) this.filter.types[1] = true; else this.filter.types[1] = false;
    if(this.typeHangout) this.filter.types[2] = true; else this.filter.types[2] = false;
  }

}
