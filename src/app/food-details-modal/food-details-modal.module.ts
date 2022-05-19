import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodDetailsModalPageRoutingModule } from './food-details-modal-routing.module';

import { FoodDetailsModalPage } from './food-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodDetailsModalPageRoutingModule
  ],
  declarations: [FoodDetailsModalPage]
})
export class FoodDetailsModalPageModule {}
