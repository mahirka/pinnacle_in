import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProdcutsPageRoutingModule } from './view-prodcuts-routing.module';

import { ViewProdcutsPage } from './view-prodcuts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProdcutsPageRoutingModule
  ],
  declarations: [ViewProdcutsPage]
})
export class ViewProdcutsPageModule {}
