import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatchesService } from '../services/data/matches.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  segmentModel = "today";
  data: any;
  dataSoon: any;

  constructor(private _authService: AuthService, private router: Router, private _dataService: MatchesService) {}

  async ngOnInit() {
    //this.data = await this._dataService.getData('matches')['matches'];
    let filter = 'dateFrom=';
    filter += this.currentDate();
    filter += '&dateTo=';
    filter += this.currentDatePlusWeek();
    console.log(filter);
    this.dataSoon = await this._dataService.getDataFilter('matches', filter)['matches'];
  }

  async logout() {
    await this._authService.logout();
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

  currentDate() : string {
    return moment().format('YYYY-MM-DD');
  }

  currentDatePlusWeek() : string {
    return moment().add(10, 'days').format('YYYY-MM-DD');
  }

}