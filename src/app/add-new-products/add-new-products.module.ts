import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewProductsPageRoutingModule } from './add-new-products-routing.module';

import { AddNewProductsPage } from './add-new-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewProductsPageRoutingModule
  ],
  declarations: [AddNewProductsPage]
})
export class AddNewProductsPageModule {}
