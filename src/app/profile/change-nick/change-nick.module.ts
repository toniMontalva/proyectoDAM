import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeNickPageRoutingModule } from './change-nick-routing.module';

import { ChangeNickPage } from './change-nick.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeNickPageRoutingModule,
    TranslateModule
  ],
  declarations: [ChangeNickPage]
})
export class ChangeNickPageModule {}
