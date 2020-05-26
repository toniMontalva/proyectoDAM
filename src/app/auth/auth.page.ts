import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { TranslateConfigService } from '../translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  email: string = "tonimontalvapastor@gmail.com";
  password: string = "";
  error: string = "";

  lan: any = {}
  selectedLanguage: string = "es";

  constructor(private translate: TranslateService, private translateService: TranslateConfigService, private router: Router, private _authService: AuthService) { 
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
  }

  async login() {
    await this._authService.login(this.email, this.password);
    this.error = this._authService.error;
    this.password = "";
    await this._authService.getUserNick();
  }

  languageChanged() {
    this.translateService.setLanguage(this.selectedLanguage);
  }

  // // Anonymous login
  // async loginAnonymously() {
  //   await this.authService.loginAnonymously();
  // }

}
