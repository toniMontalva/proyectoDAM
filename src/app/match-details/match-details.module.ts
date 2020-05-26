import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchDetailsPageRoutingModule } from './match-details-routing.module';

import { MatchDetailsPage } from './match-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [MatchDetailsPage]
})
export class MatchDetailsPageModule {}
