import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  segmentModel = "today";

  constructor(private _authService: AuthService, private router: Router) {}

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

}
