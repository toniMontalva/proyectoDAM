import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-nick',
  templateUrl: './change-nick.page.html',
  styleUrls: ['./change-nick.page.scss'],
})
export class ChangeNickPage implements OnInit {

  nick: string = "";
  selectedLanguage: string = "";
  userNick: string = "";
  error: string = "";

  constructor(
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private _authService: AuthService
  ) { 
    this.selectedLanguage = this.translate.currentLang;
    this.userNick = this._authService.userNick;
  }

  ngOnInit() {
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

  async changeNick() {
    if(this.nick == "") {
      if(this.selectedLanguage == "es") {
        this.error = "Completa el campo";
      } else if(this.selectedLanguage == "en") {
        this.error = "Complete the field";
      }
    }
    if(!this.error) {
      await this._authService.changeUserNick(this.nick);
      if(this.selectedLanguage == "es") {
        this.presentToast("Nick cambiado", 'bottom', 1200);
      } else if(this.selectedLanguage == "en") {
        this.presentToast("Nick changed", 'bottom', 1200);
      }
    }    
  }

}
