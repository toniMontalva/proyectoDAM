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
  }

  doRefresh(event) {
    this.listOfMatchesSoon = this.listOfMatchesSoon;
    this.listOfMatchesToday = this.listOfMatchesToday;

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async getTeamsInfoToday() {
    for(let i = 0; i < this.listOfMatchesToday.length; i++) {
      await this._dataService.getTeamInfo(this.listOfMatchesToday[i].awayTeam['id'])
      .subscribe(data => {
        this.listOfMatchesToday[i].picAwayTeam = data['crestUrl'];
        this.listOfMatchesToday[i].awayTeam['name'] = data['tla'];
      });
      await this._dataService.getTeamInfo(this.listOfMatchesToday[i].homeTeam['id'])
      .subscribe(data => {
        this.listOfMatchesToday[i].picHomeTeam = data['crestUrl'];
        this.listOfMatchesToday[i].homeTeam['name'] = data['tla'];
      });
    }
  }

  async getTeamsInfoSoon() {
    for(let i = 0; i < this.listOfMatchesSoon.length; i++) {
      await this._dataService.getTeamInfo(this.listOfMatchesSoon[i].awayTeam['id'])
      .subscribe(data => {
        this.listOfMatchesSoon[i].picAwayTeam = data['crestUrl'];
        this.listOfMatchesSoon[i].awayTeam = data['tla'];
      });
      await this._dataService.getTeamInfo(this.listOfMatchesSoon[i].homeTeam['id'])
      .subscribe(data => {
        this.listOfMatchesSoon[i].picHomeTeam = data['crestUrl'];
        this.listOfMatchesSoon[i].homeTeam['name'] = data['tla'];
      });
    }
  }

  async ngOnInit() {
    let filter = 'dateFrom=';
    filter += this.currentDate();
    filter += '&dateTo=';
    filter += this.currentDatePlusWeek();

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
        this.getTeamsInfoToday();
      },
      (error) =>{
        console.error(error);
      }
    );    

    await this._dataService.getDataFilter('matches', filter)
    .subscribe((data) => { // Success
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
            "time": moment(data['matches'][id].utcDate).format('MMM Do HH:mm'),
            "fav": false
          }
          this.listOfMatchesSoon.push(match);
          id++;
        }
        this.getTeamsInfoToday();
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