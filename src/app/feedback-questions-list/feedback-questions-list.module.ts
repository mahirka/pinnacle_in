import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackQuestionsListPageRoutingModule } from './feedback-questions-list-routing.module';

import { FeedbackQuestionsListPage } from './feedback-questions-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackQuestionsListPageRoutingModule
  ],
  declarations: [FeedbackQuestionsListPage]
})
export class FeedbackQuestionsListPageModule {}
