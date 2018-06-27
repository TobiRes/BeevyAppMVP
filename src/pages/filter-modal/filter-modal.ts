import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SetFilters} from "../../models/setFilters.model";
import {DateUtil} from "../../utils/date-util";
import {ToastService} from "../../services/toast.service";


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
  lastDate: string;
  suchInput: string;
  citySearch: string;
  defaultTypeFilterButtons: boolean[] = [true, true, true];
  setTypeFilterButtons: boolean[] = [true, true, true];

  //Default dates for datepicker
  defaultStartDate: string = new Date().toISOString();
  defaultEndDate: string = DateUtil.getLastPossibleDateInTheFuture();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private toastService: ToastService) {
    this.resetFilterToLastOpenedState();
  }

  setType(n: number) {
    if (!this.filter.types[n] || this.filter.types[n] == false) {
      this.filter.types[n] = true;
      this.setTypeFilterButtons[n] = true;
    }
    else {
      this.filter.types[n] = false;
      this.setTypeFilterButtons[n] = false;
    }
  }

  applyFilter() {
    this.filter.tags = this.tags;
    this.filter.earliestDate = this.earliestDate;
    this.filter.lastDate = this.lastDate;
    this.filter.city = this.citySearch;
    this.filter.search = this.suchInput;
    this.viewCtrl.dismiss(this.filter);
    this.toastService.filtersChanged();
  }

  deleteFilter() {
    this.setTypeFilterButtons = this.defaultTypeFilterButtons;
    this.filter.types = [true, true, true];
    this.filter.tags = [];
    this.filter.earliestDate = new Date().toISOString();
    this.filter.lastDate = this.defaultEndDate;
    this.filter.city = "";
    this.filter.search = "";
    this.tags = [];
    this.earliestDate = this.defaultStartDate;
    this.lastDate = this.defaultEndDate;
    this.suchInput = "";
    this.citySearch = "";
    this.viewCtrl.dismiss(this.filter);
    this.toastService.filtersResetted();
  }



  buttonColour(n: number): string {
    let cssClass: string = "beevy-info-background-more-transparent-" + n.toString();
    if (this.filter.types[n])
      cssClass = "beevy-info-background-full-" + n.toString();
    return cssClass;
  }

  search() {
    this.applyFilter();
  }

  getDateAfterChosenStartDate(): string {
    //Making sure the second datepicker can't set a time before the first datepicker
    if (new Date(this.earliestDate) > new Date(this.defaultStartDate)) {
      return this.earliestDate;
    }
    return this.defaultStartDate;
  }

  getDateBeforeChosenEndDate(): string {
    //Making sure the first datepicker can't set a time after the second datepicker
    if (new Date(this.lastDate) < new Date(this.defaultEndDate)) {
      return this.lastDate;
    }
    return this.defaultEndDate;
  }

  private resetFilterToLastOpenedState() {
    this.filter = this.navParams.get("filter");
    this.setTypeFilterButtons = this.filter.types;
    this.tags = this.filter.tags;
    this.suchInput = this.filter.search;
    this.citySearch = this.filter.city;
    if (this.filter.earliestDate) {
      this.earliestDate = this.filter.earliestDate;
    } else {
      this.earliestDate = this.defaultStartDate;
    }
    if (this.filter.lastDate) {
      this.lastDate = this.filter.lastDate;
    } else {
      this.lastDate = this.defaultEndDate;
    }
  }
}
