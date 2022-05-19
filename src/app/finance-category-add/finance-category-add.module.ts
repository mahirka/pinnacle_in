import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceCategoryAddPageRoutingModule } from './finance-category-add-routing.module';

import { FinanceCategoryAddPage } from './finance-category-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    IonicModule,
    FinanceCategoryAddPageRoutingModule
  ],
  declarations: [FinanceCategoryAddPage]
})
export class FinanceCategoryAddPageModule {}
