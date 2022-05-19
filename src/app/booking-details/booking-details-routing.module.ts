import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingDetailsPage } from './booking-details.page';

const routes: Routes = [
  {
    path: '',
    component: BookingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [InAppBrowser]
})
export class BookingDetailsPageRoutingModule {}
