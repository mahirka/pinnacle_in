import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceCategoryPage } from './finance-category.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceCategoryPageRoutingModule {}
