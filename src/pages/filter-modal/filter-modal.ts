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
  filter: SetFilters = {types: [], tags: []};

  tags = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.filter = this.navParams.get("filter");
    this.tags = this.filter.tags;
  }

  setType(n: number, id: string){
    console.log(this.filter.types[n]);
    if(this.filter.types[n] ==null || this.filter.types[n] == false){
      this.filter.types[n] = true;
      document.getElementById(id).style.opacity = "1.0";
    }
    else{
      this.filter.types[n] = false;
      document.getElementById(id).style.opacity = "0.5";
    }
    console.log(this.filter.types[n]);
  }

  applyFilter() {
    this.filter.tags = this.tags;
    this.viewCtrl.dismiss(this.filter);
  }

  buttonColour(n: number): string{
    var active = "full;"
    if(this.filter.types[n]) active = "full";
    else active = "transparent"
    return "beevy-info-background-"+active+"-"+n;
  }

}
