import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeNickPage } from './change-nick.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeNickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeNickPageRoutingModule {}
