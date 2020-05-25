import { Component, OnInit } from '@angular/core';

import { TranslateConfigService } from '../translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedLanguage: string;
  userNick: string = "";

  constructor(private translate: TranslateService, private translateService: TranslateConfigService, private _authService: AuthService) { 
    this.selectedLanguage = this.translate.currentLang;
    this.userNick = this._authService.userNick;
  }

  ngOnInit() {
  }

  languageChanged() {
    this.translateService.setLanguage(this.selectedLanguage);
  }

  logout() {
    this._authService.logout();
  }

}
