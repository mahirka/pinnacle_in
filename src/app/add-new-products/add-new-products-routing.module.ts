import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewProductsPage } from './add-new-products.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewProductsPageRoutingModule {}
