import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatchesService } from '../services/data/matches.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // Competition available in Free tier API
  //
  dataArray: any[] = [];

  constructor(private _authService: AuthService, private router: Router, private _dataService: MatchesService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._dataService.getCompetitionInfo()
    .subscribe((data) => {
      let i = 0;
      while(i < data['competitions'].length) {
        if(data['competitions'][i].area['ensignUrl']) {
          let dataTest = {
            "id": data['competitions'][i].id,
            "name": data['competitions'][i].name,
            "flag": data['competitions'][i].area['ensignUrl']
          }
          this.dataArray.push(dataTest);
        }        
        i++;
      }
      console.log('data array', this.dataArray);
      console.log('leagues', data);
    }), (error) => {
      console.log('error ', error);
    }
  }

  async logout() {
    await this._authService.logout();
  }

}
