import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodDetailsModalPage } from './food-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FoodDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodDetailsModalPageRoutingModule {}
