import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryAddPageRoutingModule } from './product-category-add-routing.module';

import { ProductCategoryAddPage } from './product-category-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule ,
    ProductCategoryAddPageRoutingModule
  ],
  declarations: [ProductCategoryAddPage]
})
export class ProductCategoryAddPageModule {}
