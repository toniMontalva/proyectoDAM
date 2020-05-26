import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatchesService } from '../services/data/matches.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { ITeam, IMatch } from '../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  segmentModel = "today";
  listOfTeams: ITeam[];
  listOfMatchesToday: IMatch[] = [];
  listOfMatchesSoon: IMatch[] = [];
  data: any;
  dataSoon: any;

  constructor(private _authService: AuthService, private router: Router, private _dataService: MatchesService) {
    // this._dataService.getData('matches');
    // let filter = 'dateFrom=';
    // filter += this.currentDate();
    // filter += '&dateTo=';
    // filter += this.currentDatePlusWeek();
    // console.log(filter);
    // this._dataService.getDataFilter('matches', filter);
  }

  async ngOnInit() {
    let filter = 'dateFrom=';
    filter += this.currentDate();
    filter += '&dateTo=';
    filter += this.currentDatePlusWeek();

    // await this._dataService.getData('matches')
    // .subscribe(
    //   (data) => { // Success
    //     this.data = data['matches'];
    //     id.push(data['awayTeam.id']);
    //     id.push(data['homeTeam.id']);
    //   },
    //   (error) =>{
    //     console.error(error);
    //   }
    // );

    await this._dataService.getData('matches')
    .subscribe(
      (data) => { // Success
        let id = 0;
        while(id < data['matches'].length) {
          let match : IMatch = {
            "id" : data['matches'][id].id,
            "awayTeam" : data['matches'][id].awayTeam,
            // "picAwayTeam" : this.getTeamInfo(data['matches'][id].awayTeam.id)['pic'],
            "picAwayTeam" : 'assets/ball.png',
            "homeTeam" : data['matches'][id].homeTeam,
            // "picHomeTeam" : this.getTeamInfo(data['matches'][id].awayTeam.id)['pic'],
            "picHomeTeam" : 'assets/ball.png',
            "league": data['matches'][id].competition.name,
            "time": moment(data['matches'][id].utcDate).format('HH:mm'),
            "fav": false
          }
          this.listOfMatchesToday.push(match);
          id++;
        }         
      },
      (error) =>{
        console.error(error);
      }
    );

    await this._dataService.getDataFilter('matches', filter)
    .subscribe((data) => { // Success
      console.log(data);
      this.dataSoon =  data['matches'];
    },
    (error) =>{
      console.error(error);
    });

    console.log(this.listOfMatchesToday);
  }

  addFav(id) {
    if(this.segmentModel == "today") {
      for(let i = 0; i < this.listOfMatchesToday.length; i++) {
        if(this.listOfMatchesToday[i].id == id) {
          this.listOfMatchesToday[i].fav = true;
          this._dataService.favMatches.push(this.listOfMatchesToday[i]);
        }
      }
    }    
    console.log(this.listOfMatchesToday);
  }

  removeFav(id) {
    if(this.segmentModel == "today") {
      for(let i = 0; i < this.listOfMatchesToday.length; i++) {
        if(this.listOfMatchesToday[i].id == id) {
          this.listOfMatchesToday[i].fav = false;
        }
      }
    }
  }

  async getTeamInfo(id) {
    await this._dataService.getTeamInfo(id)
      .subscribe(data => {
        let team : ITeam = {
          "id" : id,
          "name" : data['shortName'],
          "pic" : data['crestUrl']
        }
        return team;
      });
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