import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsAddPage } from './rooms-add.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsAddPageRoutingModule {}
