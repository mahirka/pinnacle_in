import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { BookingModalPage } from '../booking-modal/booking-modal.page';
import { CheckOutPage } from '../check-out/check-out.page';
import { CheckinPage } from '../checkin/checkin.page';
import { FeedbackPage } from '../feedback/feedback.page';
import { FoodDetailsModalPage } from '../food-details-modal/food-details-modal.page';
import { BookingService } from '../providers/booking.service';
import { CommonService } from '../providers/common';
import { EventPublishService } from '../providers/event';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {

  book_id: any;
  booking_details: any = []
  payment_details: any = []
  expense_data: any = []
  guest_details: any = []
  currentDate: any = Date()

  constructor(private route: ActivatedRoute, private booking: BookingService, private modalCtrl: ModalController, private datePipe: DatePipe, private event: EventPublishService,private alertCtrl:AlertController,private common:CommonService,private iab: InAppBrowser) {
    this.route.params.subscribe(val => {
      this.book_id = val['id']
    })
  }

  ngOnInit() {
    this.getBookingView()
    this.getTransactions()
    this.getExpense()
  }

  getBookingView() {
    this.booking.getBookingView(this.book_id).subscribe(resp => {
      if (resp.status == "Success") {
        this.booking_details = resp.data.list
        console.log(this.booking_details)
        if (this.booking_details?.guestDetails?.length > 0) {
          this.guest_details = JSON.parse(this.booking_details?.guestDetails)
        }

      }
    })
  }


  async openPayment() {
    const modal = await this.modalCtrl.create({
      component: BookingModalPage,
      cssClass: '',
      componentProps: {
        booking: this.booking_details
      }
    });
    await modal.present();
    await modal.onWillDismiss().then((data) => {
      this.getBookingView()
      this.getTransactions()
      this.getExpense()
    })
  }


  async addFoodDetails() {
    const modal = await this.modalCtrl.create({
      component: FoodDetailsModalPage,
      cssClass: '',
      componentProps: {
        booking: this.booking_details
      }
    });
    await modal.present();
    await modal.onWillDismiss().then((data) => {
      this.getBookingView()
      this.getTransactions()
      this.getExpense()
    })
  }


  async openCheckIn() {
    const modal = await this.modalCtrl.create({
      component: CheckinPage,
      cssClass: '',
      componentProps: {
        booking: this.booking_details
      }
    });
    await modal.present();
    await modal.onWillDismiss().then((data) => {
      this.getBookingView()
      this.getTransactions()
      this.getExpense()
    })
  }

  getTransactions() {
    this.booking.getTransactions(this.book_id).subscribe(resp => {
      if (resp.status == 'Success') {
        this.payment_details = resp.data.lists
      }
    })
  }

  getExpense() {
    this.booking.getExpenseBooking(this.book_id).subscribe(resp => {
      if (resp.status == 'Success') {
        this.expense_data = resp.data.lists
      }
    })
  }


  async openCheckout() {
    const modal = await this.modalCtrl.create({
      component: CheckOutPage,
      cssClass: '',
      componentProps: {
        booking: this.booking_details
      }
    });
    await modal.present();
    await modal.onWillDismiss().then((data) => {
      this.getBookingView()
      this.getTransactions()
      this.getExpense()
    })
  }


  getClass(status) {
    if (status == 'REQUESTED') {
      return 'main_card_booking'
    } else {
      return 'green'
    }
  }

  checkCheckinDate() {
    let isValid = false
    if (this.datePipe.transform(this.currentDate, 'dd MMM yyyy') == this.datePipe.transform(this.booking_details.checkIn, 'dd MMM yyyy')) {
      isValid = true
    }
    return isValid
  }

  openWhatsApp() {
    const url=encodeURI('https://wa.me/' + this.booking_details.whatsappNo + '/?text=Your Boobing status is ' + this.booking_details.bookingStatus);
    console.log(url);
    console.log(this.iab);
    // this.iab.create('https://ionicframework.com/');
    const browser =this.iab.create(url, '_system');
    console.log(browser);
    window.open('whatsapp://send?phone=919633325528');
    window.open('http://apache.org', '_blank', 'location=yes');

  }

  async cancelBooking() {

    const alert = await this.alertCtrl.create({
      header: 'Cancel Booking?',
      subHeader: "Are You Sure You Want to Cancel ? ",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            var data = {
              bookingStatus: 'CANCELLED'
            }
            this.booking.checkIn(data, this.booking_details._id).subscribe(resp => {
              if (resp.status == 'Success') {
                this.event.publishSomeData("booking")
                this.getBookingView()
                this.getTransactions()
                this.getExpense()
              }
            }, error => {
            })
          }
        }
      ]
    });


    await alert.present();
  }

  async markDeliverd(data){
    // if(!['CHECKED_IN','CHECKED_OUT'].includes(this.booking_details.bookingStatus)){
    //   this.common.presentToast("You can not mark as delivered before check in");
    //   return;
    // }

    const alert = await this.alertCtrl.create({
      header: 'Mark As Deliverd',
      subHeader: "Are You Sure ? ",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            var data2={
              title:data.title,
              quanity:+data.quanity,
              amount:+data.amount,
              requestedStatus:'DELIVERED',
              booking:this.booking_details._id,
             }
             this.booking.addFoodDetails(data2,true,data._id).subscribe(resp=>{
               if(resp.status == 'Success'){
                 this.getBookingView();
                 this.getExpense()
               }
             },error=>{

             })
          }
        }
      ]
    });

    await alert.present();

  }


  async openFeedback(){
    const modal = await this.modalCtrl.create({
      component: FeedbackPage,
      cssClass: '',
      componentProps: {
        booking: this.booking_details
      }
    });
    await modal.present();
    await modal.onWillDismiss().then((data) => {
      this.getBookingView()
      this.getTransactions()
      this.getExpense()
    })
  }

}

