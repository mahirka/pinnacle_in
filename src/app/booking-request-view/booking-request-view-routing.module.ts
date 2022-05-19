import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingRequestViewPage } from './booking-request-view.page';

const routes: Routes = [
  {
    path: '',
    component: BookingRequestViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRequestViewPageRoutingModule {}
