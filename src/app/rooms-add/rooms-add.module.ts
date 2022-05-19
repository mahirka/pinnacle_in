import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsAddPageRoutingModule } from './rooms-add-routing.module';

import { RoomsAddPage } from './rooms-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomsAddPageRoutingModule
  ],
  declarations: [RoomsAddPage]
})
export class RoomsAddPageModule {}
