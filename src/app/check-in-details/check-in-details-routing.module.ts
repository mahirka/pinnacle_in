import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInDetailsPage } from './check-in-details.page';

const routes: Routes = [
  {
    path: '',
    component: CheckInDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckInDetailsPageRoutingModule {}
