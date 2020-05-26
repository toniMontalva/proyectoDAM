import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from '../services/data/matches.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage implements OnInit {

  id : number;
  match: any;
  league: string = "";

  constructor(private _activatedRoute: ActivatedRoute, private _dataService: MatchesService) { }

  async ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    await this._dataService.getMatchInfo(this.id)
    .subscribe(
      (data) => { // Success
        console.log('body', data);
        this.league = data['match'].competition.name;
      },
      (error) =>{
        console.error(error);
      }
    );
  }

}
