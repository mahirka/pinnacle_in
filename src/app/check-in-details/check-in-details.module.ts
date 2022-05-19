import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckInDetailsPageRoutingModule } from './check-in-details-routing.module';

import { CheckInDetailsPage } from './check-in-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckInDetailsPageRoutingModule
  ],
  declarations: [CheckInDetailsPage]
})
export class CheckInDetailsPageModule {}
