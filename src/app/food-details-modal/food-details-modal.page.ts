import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BookingService } from '../providers/booking.service';
import { CommonService } from '../providers/common';
import { EventPublishService } from '../providers/event';

@Component({
  selector: 'app-food-details-modal',
  templateUrl: './food-details-modal.page.html',
  styleUrls: ['./food-details-modal.page.scss'],
})
export class FoodDetailsModalPage implements OnInit {

  foodAddForm:any=FormGroup
  bookingData:any=[]
  submitted:boolean=false
  isSpinner:boolean=false

  constructor(private fb:FormBuilder,private navParams:NavParams,private bookingService:BookingService,private modalCtrl:ModalController,
    private event:EventPublishService,private common:CommonService) {
    if(this.navParams.get("booking")){
      this.bookingData=this.navParams.get("booking")
    }
  }

  ngOnInit() {
    this.foodAddForm=this.fb.group({
      title:['',Validators.required],
      quanity:['',Validators.required],
      amount:['',Validators.required],
      requestedStatus:['REQUESTED',Validators.required],
      deliveryTime:['']
    })
  }

  get epf(){return this.foodAddForm.controls}

  submitFooddetails(){
    if(this.epf.requestedStatus.value==='DELIVERED' && !['CHECKED_IN','CHECKED_OUT'].includes(this.bookingData.bookingStatus)){
      this.common.presentToast('You can not mark as delivered before check in');
      return;
    }
   this.submitted=true
   if(this.foodAddForm.valid){
     this.isSpinner=true
     var data:any={
      title:this.epf.title.value,
      quanity:+this.epf.quanity.value,
      amount:+this.epf.amount.value,
      requestedStatus:this.epf.requestedStatus.value,
      booking:this.bookingData._id
     }
     if(this.epf.deliveryTime.value){
      data.expectedDeliveryTime=(this.epf.deliveryTime.value+':00+0530');
     }
     this.bookingService.addFoodDetails(data).subscribe(resp=>{
       if(resp.status == 'Success'){
         this.event.publishSomeData("booking")
         this.isSpinner=false
         this.modalCtrl.dismiss()
       }
     },error=>{
       this.isSpinner=false
     })
   }
  }


  closeModel(){
    this.modalCtrl.dismiss()
  }

}
