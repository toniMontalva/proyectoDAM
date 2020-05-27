import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from '../services/data/matches.service';
import * as moment from 'moment';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage implements OnInit {

  id: number;
  league: string = "";
  homeTeam: string = "";
  homeTeamPic: string = "";
  homeTeamId: number;
  awayTeam: string = "";
  awayTeamPic: string = "";
  awayTeamId: number;
  matchTime: string = "";
  head2head: any[] = [];



  constructor(private _activatedRoute: ActivatedRoute, private _dataService: MatchesService) { }

  ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._dataService.getMatchInfo(this.id)
      .subscribe(
        (data) => { // Success
          console.log('body', data);
          this.league = data['match'].competition.name;
          this.homeTeamId = data['match'].homeTeam['id'];
          this.awayTeamId = data['match'].awayTeam['id'];
          this.matchTime = moment(data['match'].utcDate).format('MMM Do HH:mm');
          this.head2head = data['head2head'];
        },
        (error) => {
          console.error(error);
        }
      );

    setTimeout(() => {
      this.getTeamHomeInfo();
    }, 1000);
    setTimeout(() => {
      this.getTeamAwayInfo();
    }, 1000);
  }

  getTeamHomeInfo() {
    this._dataService.getTeamInfo(this.homeTeamId)
      .subscribe(data => {
        console.log('body', data);
        this.homeTeamPic = data['crestUrl'];
        this.homeTeam = data['tla'];
      });
  }

  getTeamAwayInfo() {
    this._dataService.getTeamInfo(this.awayTeamId)
      .subscribe(data => {
        console.log('body', data);
        this.awayTeamPic = data['crestUrl'];
        this.awayTeam = data['tla'];
      });
  }

}
