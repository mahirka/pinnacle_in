import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsViewPageRoutingModule } from './rooms-view-routing.module';

import { RoomsViewPage } from './rooms-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomsViewPageRoutingModule
  ],
  declarations: [RoomsViewPage]
})
export class RoomsViewPageModule {}
