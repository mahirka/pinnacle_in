import { ModalController } from '@ionic/angular';
import { AddBookingPage } from './../add-booking/add-booking.page';
import { CommonService } from './../providers/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './../providers/booking.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-request-view',
  templateUrl: './booking-request-view.page.html',
  styleUrls: ['./booking-request-view.page.scss'],
})
export class BookingRequestViewPage implements OnInit {

  itemId: any;
  item: any;
  form: any = FormGroup;
  submitted = false;
  isSpinner = false;


  constructor(private route: ActivatedRoute, private booking: BookingService, public fb: FormBuilder, private common: CommonService, private modalCtrl: ModalController) {
    this.route.params.subscribe(val => {
      this.itemId = val.id;
    });
  }

  get epf() { return this.form.controls; }

  ngOnInit() {
    this.getItemDetails();
    this.form = this.fb.group({
      status: ['', Validators.required],
      comment: ['']
    });
  }

  getItemDetails() {
    this.booking.getBookingRequestView(this.itemId).subscribe(resp => {
      if (resp.status === 'Success') {
        this.item = resp.data.list;
        console.log(this.item);
        this.form.get('status').patchValue(this.item.bookingStatus);
        this.form.get('comment').patchValue(this.item.comments);
      }

    });
  }

  updateStatus() {
    this.submitted = true;
    if (this.form.valid) {
      this.isSpinner = true;
      const data = {
        bookingStatus: this.epf.status.value,
        comments: this.epf.comment.value,
      };
      this.booking.updateBookingRequest(data, this.itemId).subscribe(resp => {
        if (resp.status === 'Success') {
          this.isSpinner = false;
          this.common.presentToast('Successfully Saved');
        }
      }, error => {
        this.isSpinner = false;
      });
    }
  }

  async openBooking() {
    let checkIn = moment(new Date());
    if (this.item.checkIn) {
      checkIn = moment(this.item.checkIn);
    }
    console.log(this.item.checkIn,checkIn);

    const modal = await this.modalCtrl.create({
      component: AddBookingPage,
      cssClass: '',
      componentProps: {
        room: this.item,
        checkInDate: checkIn['_d'],
        noOfNights:this.item.noOfNights>0?this.item.noOfNights:1,
        booking_request: true
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(async (data) => { });
  }


}
