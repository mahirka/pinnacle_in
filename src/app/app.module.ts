import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AddBookingPage } from './add-booking/add-booking.page';
import { BookingModalPage } from './booking-modal/booking-modal.page';
import { FoodDetailsModalPage } from './food-details-modal/food-details-modal.page';
import { CheckinPage } from './checkin/checkin.page';
import { CheckOutPage } from './check-out/check-out.page';
import { BookingSuccessPage } from './booking-success/booking-success.page';
import { RoomsAddPage } from './rooms-add/rooms-add.page';
import { FeedbackPage } from './feedback/feedback.page';
import { FeedbackQuestionsAddComponent } from './feedback-questions-add/feedback-questions-add.component';



@NgModule({
  declarations: [AppComponent,LoginComponent,AddBookingPage,BookingModalPage,FoodDetailsModalPage,CheckinPage,CheckOutPage,BookingSuccessPage,RoomsAddPage,FeedbackPage,FeedbackQuestionsAddComponent],
  entryComponents: [LoginComponent,AddBookingPage,BookingModalPage,FoodDetailsModalPage,CheckinPage,CheckOutPage,BookingSuccessPage,RoomsAddPage,FeedbackPage,FeedbackQuestionsAddComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
