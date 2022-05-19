import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingRequestListPage } from './booking-request-list.page';

const routes: Routes = [
  {
    path: '',
    component: BookingRequestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRequestListPageRoutingModule {}
