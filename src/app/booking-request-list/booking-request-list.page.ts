import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AddBookingPage } from '../add-booking/add-booking.page';
import { BookingService } from '../providers/booking.service';

@Component({
  selector: 'app-booking-request-list',
  templateUrl: './booking-request-list.page.html',
  styleUrls: ['./booking-request-list.page.scss'],
})
export class BookingRequestListPage implements OnInit {

  bookingRequestList:any=[]

  constructor(private booking:BookingService,private alertController:AlertController,private modalCtrl:ModalController,private router:Router) { }

  ngOnInit() {
    this.getBookngRequests()
  }

  getBookngRequests(){
    this.booking.getBookingRequests().subscribe(resp=>{
      if(resp.status == 'Success'){
       this.bookingRequestList=resp.data.lists
      }
    })
  }

  async sendBookingRequest(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'Name',
          type: 'text',
          placeholder: 'Enter Customer name'
        },
        {
          name: 'Phone',
          type: 'number',
          placeholder: 'Enter Watsupp number'
        },
        // multiline input.
        {
          name: 'Message',
          type: 'textarea',
          placeholder: 'Message',
          value:"Please send your query use this link"
        },
        {
          name: 'Link',
          type: 'url',
          placeholder: 'Enter the link'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data.Phone);
            if(data.phone){
            window.open('https://wa.me/' + data.Phone + '/?text=Hi ' + data.Name + ',<br>' + data.Message + '<br>' +data.Link)
            }
          }
        }
      ]
    });

    await alert.present();
  }

  goToBookingDetails(item){
    this.router.navigate(['/booking-request-view',item._id])
  }

  async openBooking(data){
    let checkIn=moment(data.checkIn)
    const modal = await this.modalCtrl.create({
      component: AddBookingPage,
      cssClass: '',
      componentProps:{
        room:data,
        checkInDate:checkIn['_d'],
        booking_request:true
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(async (data) => {})
  }
}
