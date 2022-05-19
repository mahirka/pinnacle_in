import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceCategoryAddPage } from './finance-category-add.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceCategoryAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceCategoryAddPageRoutingModule {}
