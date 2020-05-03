import { Component, OnInit } from '@angular/core';

import { TranslateConfigService } from '../translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedLanguage: string;

  constructor(private translate: TranslateService, private translateService: TranslateConfigService) { 
    this.selectedLanguage = this.translate.currentLang;
  }

  ngOnInit() {
  }

  languageChanged() {
    this.translateService.setLanguage(this.selectedLanguage);
  }

}
