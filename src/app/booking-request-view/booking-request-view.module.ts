import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingRequestViewPageRoutingModule } from './booking-request-view-routing.module';

import { BookingRequestViewPage } from './booking-request-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookingRequestViewPageRoutingModule
  ],
  declarations: [BookingRequestViewPage]
})
export class BookingRequestViewPageModule {}
