import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingRequestListPageRoutingModule } from './booking-request-list-routing.module';

import { BookingRequestListPage } from './booking-request-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingRequestListPageRoutingModule
  ],
  declarations: [BookingRequestListPage]
})
export class BookingRequestListPageModule {}
