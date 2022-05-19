import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsViewPage } from './rooms-view.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsViewPageRoutingModule {}
