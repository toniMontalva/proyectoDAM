import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { IMatch } from '../interfaces';
import { MatchesService } from '../services/data/matches.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  favMatches : IMatch[] = [];

  constructor(private _authService: AuthService, private router: Router, private _dataService: MatchesService) {
    this.favMatches = this._dataService.favMatches;
  }

  async logout() {
    await this._authService.logout();
  }

  profile() {
    this.router.navigate(['/profile']);
  }

}
