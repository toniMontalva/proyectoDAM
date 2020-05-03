import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private _authService: AuthService, private router: Router) {}

  async logout() {
    await this._authService.logout();
  }

  profile() {
    this.router.navigate(['/profile']);
  }

}
