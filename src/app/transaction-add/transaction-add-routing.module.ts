import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionAddPage } from './transaction-add.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionAddPageRoutingModule {}
