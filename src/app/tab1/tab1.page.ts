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
  listOfFavMatches: any[] = [];
  data: any;
  dataSoon: any;
  filter: string = "";

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
    for (let i = 0; i < this.listOfMatchesToday.length; i++) {
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
    for (let i = 0; i < this.listOfMatchesSoon.length; i++) {
      await this._dataService.getTeamInfo(this.listOfMatchesSoon[i].awayTeam['id'])
        .subscribe(data => {
          this.listOfMatchesSoon[i].picAwayTeam = data['crestUrl'];
          this.listOfMatchesSoon[i].awayTeam['name'] = data['tla'];
        });
      await this._dataService.getTeamInfo(this.listOfMatchesSoon[i].homeTeam['id'])
        .subscribe(data => {
          this.listOfMatchesSoon[i].picHomeTeam = data['crestUrl'];
          this.listOfMatchesSoon[i].homeTeam['name'] = data['tla'];
        });
    }
  }

  ngOnInit() {
    this.filter = 'dateFrom=';
    this.filter += this.currentDatePlusDay();
    this.filter += '&dateTo=';
    this.filter += this.currentDatePlusWeek();

    // var intento = this._dataService.getTeamInfoDuplicated(4);
    // console.log(intento);

    this.showData();    
  }

  getInfoTeams() {
    if (this.segmentModel == "today") {
      this.getTeamsInfoToday();
    } else {
      this.getTeamsInfoSoon();
    }
  }

  showData() {
    if (this.segmentModel == "today" && this.listOfMatchesToday.length == 0) {
     this._dataService.getData('matches')
      .subscribe(
        (data) => { // Success
          let id = 0;
          while (id < data['matches'].length) {
            let match: IMatch = {
              "id": data['matches'][id].id,
              "awayTeam": data['matches'][id].awayTeam,
              // "picAwayTeam" : this.getTeamInfo(data['matches'][id].awayTeam.id)['pic'],
              "picAwayTeam": 'assets/ball.png',
              "homeTeam": data['matches'][id].homeTeam,
              // "picHomeTeam" : this.getTeamInfo(data['matches'][id].awayTeam.id)['pic'],
              "picHomeTeam": 'assets/ball.png',
              "league": data['matches'][id].competition.name,
              "time": moment(data['matches'][id].utcDate).format('HH:mm'),
              "fav": false
            }
            this.listOfMatchesToday.push(match);
            id++;
          }
        },
        (error) => {
          console.error(error);
        }
      );
      setTimeout(() => {
        this.getInfoTeams();
      }, 2000);
    } else if(this.segmentModel == "next" && this.listOfMatchesSoon.length == 0) {
      this._dataService.getDataFilter('matches', this.filter)
      .subscribe((data) => { // Success
        let id = 0;
        while (id < data['matches'].length) {
          let match: IMatch = {
            "id": data['matches'][id].id,
            "awayTeam": data['matches'][id].awayTeam,
            // "picAwayTeam" : this.getTeamInfo(data['matches'][id].awayTeam.id)['pic'],
            "picAwayTeam": 'assets/ball.png',
            "homeTeam": data['matches'][id].homeTeam,
            // "picHomeTeam" : this.getTeamInfo(data['matches'][id].awayTeam.id)['pic'],
            "picHomeTeam": 'assets/ball.png',
            "league": data['matches'][id].competition.name,
            "time": moment(data['matches'][id].utcDate).format('MMM Do HH:mm'),
            "fav": false
          }
          this.listOfMatchesSoon.push(match);
          id++;
        }
      },
        (error) => {
          console.error(error);
        });
        setTimeout(() => {
          this.getInfoTeams();
        }, 2000);
    }
  }

  addFav(id) {
    if (this.segmentModel == "today") {
      for (let i = 0; i < this.listOfMatchesToday.length; i++) {
        if (this.listOfMatchesToday[i].id == id) {
          this.listOfMatchesToday[i].fav = true;
          this._dataService.favMatches.push(this.listOfMatchesToday[i]);
          this.listOfFavMatches.push(this.listOfMatchesToday[i]);
        }
      }
    } else {
      for (let i = 0; i < this.listOfMatchesSoon.length; i++) {
        if (this.listOfMatchesSoon[i].id == id) {
          this.listOfMatchesSoon[i].fav = true;
          this._dataService.favMatches.push(this.listOfMatchesSoon[i]);
          this.listOfFavMatches.push(this.listOfMatchesSoon[i]);
        }
      }
    }
    console.log(this.listOfMatchesToday);
  }

  removeFav(id) {
    if (this.segmentModel == "today") {
      for (let i = 0; i < this.listOfMatchesToday.length; i++) {
        if (this.listOfMatchesToday[i].id == id) {
          this.listOfMatchesToday[i].fav = false;
        }
      }
    } else {
      for (let i = 0; i < this.listOfMatchesSoon.length; i++) {
        if (this.listOfMatchesSoon[i].id == id) {
          this.listOfMatchesSoon[i].fav = false;
        }
      }
    }
  }

  getTeamInfo(id) {
    this._dataService.getTeamInfo(id)
      .subscribe(data => {
        let team: ITeam = {
          "id": id,
          "name": data['shortName'],
          "pic": data['crestUrl']
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

  segmentChanged(event) {
    console.log(this.segmentModel);
    this.showData();

    console.log(event);
  }

  currentDatePlusDay(): string {
    return moment().add(1, 'days').format('YYYY-MM-DD');
  }

  currentDatePlusWeek(): string {
    return moment().add(3, 'days').format('YYYY-MM-DD');
  }

}