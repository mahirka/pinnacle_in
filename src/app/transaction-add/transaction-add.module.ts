import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionAddPageRoutingModule } from './transaction-add-routing.module';

import { TransactionAddPage } from './transaction-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionAddPageRoutingModule
  ],
  declarations: [TransactionAddPage]
})
export class TransactionAddPageModule {}
