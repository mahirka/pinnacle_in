import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceCategoryPageRoutingModule } from './finance-category-routing.module';

import { FinanceCategoryPage } from './finance-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule ,
    FinanceCategoryPageRoutingModule
  ],
  declarations: [FinanceCategoryPage]
})
export class FinanceCategoryPageModule {}
