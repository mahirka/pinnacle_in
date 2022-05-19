import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProdcutsPage } from './view-prodcuts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProdcutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProdcutsPageRoutingModule {}
