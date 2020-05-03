import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(
    private translate: TranslateService
  ) { }

  getDefaultLanguage() {
    let lang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(lang);
    return lang;
  }
  
  setLanguage(setLang) {
    this.translate.use(setLang);
  }

  getLanguage() : string {
    return this.translate.currentLang;
  }
}
