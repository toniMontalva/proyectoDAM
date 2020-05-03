import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  email: string = "tonimontalvapastor@gmail.com";
  password: string = "";
  error: string = "";

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit() {
  }

  async navTabs() {
    
  }

  async login() {
    await this._authService.login(this.email, this.password);
    this.error = this._authService.error;
    this.password = ""; 
  }

  // // Anonymous login
  // async loginAnonymously() {
  //   await this.authService.loginAnonymously();
  // }

}
