import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string = "";
  password: string = "";
  confpassword: string = "";
  error: string = "";

  lang: string = "";

  constructor(private _authService: AuthService, private alertController: AlertController, private translate: TranslateService) { }

  ngOnInit() {
    this.lang = this.translate.currentLang;
  }

  async presentAlert() {
    if(this.lang == "en") {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Error while creating an user',
        message: 'Passwords don\'t match',
        buttons: ['OK']
      });
      await alert.present();
    } else if(this.lang == "es") {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Ha habido un error al crear la cuenta',
        message: 'Las contraseñas no coindicen',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async signup() {
    if (this.password == this.confpassword) {
      await this._authService.signup(this.email, this.password);
      this.error = this._authService.error;
    } else {
      this.presentAlert();
    }
  }

}
