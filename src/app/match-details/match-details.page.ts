import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from '../services/data/matches.service';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage implements OnInit {

  id: number;
  league: string = "";
  // home team variables
  homeTeam: string = "";
  homeTeamPic: string = "";
  homeTeamId: number;
  // away team variables
  awayTeam: string = "";
  awayTeamPic: string = "";
  awayTeamId: number;
  // match variables
  matchTime: string = "";
  //head2head: any[] = [];
  venue: string = "";
  // handling variables
  value: string = "";
  error: string = "";


  constructor(private _activatedRoute: ActivatedRoute, private _dataService: MatchesService, private toastCrtl: ToastController) { }

  ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    this.error = "";
    // request the match info to the API
    this._dataService.getMatchInfo(this.id)
      .subscribe(
        (data) => { // Success
          console.log('body', data);
          this.league = data['match'].competition.name;
          this.homeTeamId = data['match'].homeTeam['id'];
          this.awayTeamId = data['match'].awayTeam['id'];
          this.matchTime = moment(data['match'].utcDate).format('MMM Do HH:mm');
          //this.head2head = data['head2head'];
          this.venue = data['match'].venue;
          this.value = data['match'].matchday;
        },
        (error) => {
          console.error(error);
        }
      );

    // i set a timeout to get the teams info because of async purpose with last request.
    setTimeout(() => {
      this.getTeamHomeInfo();
    }, 2000);
    setTimeout(() => {
      this.getTeamAwayInfo();
    }, 2000);

    // if there's any error with API, request it again text shows up
    if(!this.homeTeamPic || !this.awayTeamPic) {
      this.error = "API error, pull to refresh.";
    }
  }

  // obtain the info of the home team(picture and code name)
  getTeamHomeInfo() {
    this._dataService.getTeamInfo(this.homeTeamId)
      .subscribe(data => {
        console.log('body', data);
        this.homeTeamPic = data['crestUrl'];
        this.homeTeam = data['tla'];
      });
    if(!this.homeTeamPic) {
      this.error = "API error, pull to refresh.";
    }
  }

  // obtain the info of the away team(picture and code name)
  getTeamAwayInfo() {
    this._dataService.getTeamInfo(this.awayTeamId)
      .subscribe(data => {
        console.log('body', data);
        this.awayTeamPic = data['crestUrl'];
        this.awayTeam = data['tla'];
      });
    if(!this.awayTeamPic) {
      this.error = "API error, pull to refresh.";
    }
  }

  doRefresh(event) {
    this.error = "";
    // sometimes API doesn't give us both info at once so we can request the one's info left
    if(!this.homeTeamPic) {
      this.getTeamHomeInfo();      
    } else if(!this.awayTeamPic) {
      this.getTeamAwayInfo();
    }

    // main error
    if(this.league == "") {
      this.ngOnInit();
    }

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentToast() {
    const toast = await this.toastCrtl.create({
      message: 'Ahora serás(supuestamente) redirigido a Bet365.',
      color: 'dark',
      duration: 2000
    });
    toast.present();
  }

}
