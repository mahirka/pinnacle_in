import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsViewPageRoutingModule } from './products-view-routing.module';

import { ProductsViewPage } from './products-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsViewPageRoutingModule
  ],
  declarations: [ProductsViewPage]
})
export class ProductsViewPageModule {}
