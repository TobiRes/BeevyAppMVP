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
  earliestDate: string;
  latestDate: string;
  suchInput: string;
  citySearch: string;

  //TODO: Set automatically and put it in config
  defaultEndDate: string ="2018-12-31T24:24:24.335Z";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.filter = this.navParams.get("filter");
    this.tags = this.filter.tags;
    this.suchInput  = this.filter.search;
    this.citySearch = this.filter.city;
    if(this.filter.earliestDate != null){
      this.earliestDate = this.filter.earliestDate;
    }
    else{
      this.earliestDate = new Date().toISOString();
    }
    if(this.filter.latestDate != null){
      this.latestDate = this.filter.latestDate;
    }
    else{
      this.latestDate =   this.defaultEndDate;
    }

  }

  setType(n: number, id: string){
    //TODO: Work with classes instead of document
    console.log(this.filter.types[n]);
    if(this.filter.types[n] == null || this.filter.types[n] == false){
      this.filter.types[n] = true;
      document.getElementById(id).style.opacity = "1.0";
    }
    else{
      this.filter.types[n] = false;
      document.getElementById(id).style.opacity = "0.5";
    }
  }

  applyFilter() {
    this.filter.tags = this.tags;
    this.filter.earliestDate = this.earliestDate;
    this.filter.latestDate = this.latestDate;
    this.filter.city = this.citySearch;
    this.filter.search = this.suchInput;
    this.viewCtrl.dismiss(this.filter);
  }

  deleteFilter(){
    this.filter.types = [true,true,true];
    for(let n=0; n<3; n++){
      document.getElementById("typeButton"+n).style.opacity = "1.0";
    }
    this.filter.tags = [];
    this.filter.earliestDate = new Date().toISOString();
    this.filter.latestDate = this.defaultEndDate;
    this.filter.city= "";
    this.filter.search= "";
    this.tags = [];
    this.earliestDate=new Date().toISOString();
    this.latestDate= this.defaultEndDate;
    this.suchInput="";
    this.citySearch= "";
    this.viewCtrl.dismiss(this.filter);
  }

  buttonColour(n: number): string{
    let cssClass: string = "beevy-info-background-more-transparent-" + n.toString();
    if(this.filter.types[n])
      cssClass = "beevy-info-background-full-" + n.toString();
    return cssClass;
  }

  search(q: string) {
    this.filter.tags = this.tags;
    this.filter.earliestDate = this.earliestDate;
    this.filter.latestDate = this.latestDate;
    this.filter.city = this.citySearch;
    this.filter.search = q;

    this.viewCtrl.dismiss(this.filter);
  }
}
