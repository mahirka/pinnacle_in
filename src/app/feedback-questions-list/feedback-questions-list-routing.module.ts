import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackQuestionsListPage } from './feedback-questions-list.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackQuestionsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackQuestionsListPageRoutingModule {}
