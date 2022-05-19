import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BookingService } from '../providers/booking.service';
import { EventPublishService } from '../providers/event';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.page.html',
  styleUrls: ['./booking-modal.page.scss'],
})
export class BookingModalPage implements OnInit {

  paymentForm:any=FormGroup
  submitted:boolean=false
  bookingData:any=[]
  banks:any=[]
  isSpinner:boolean=false

  constructor(public fb:FormBuilder,private navParams:NavParams,private bookingService:BookingService,private modalCtrl:ModalController,
    private event:EventPublishService) {

  }

  ngOnInit() {
    this.loadBanks();
    this.paymentForm=this.fb.group({
      amount:['',Validators.required],
      paymentMode:['CASH',Validators.required],
      date:['',Validators.required],
      discountAmount:[''],
      bankDetailId:[''],
      comments:[''],
    })
    if(this.navParams.get("booking")){
      this.bookingData=this.navParams.get("booking")
      this.paymentForm.get('date').setValue( this.bookingData.bookingDate)
    }
  }

  loadBanks(){
    this.bookingService.getBanks().subscribe(resp=>{
      if(resp.status == 'Success'){
       this.banks=resp.data.lists
      }
    })
  }

  get epf() {return this.paymentForm.controls}

  UpdatePayment(){
    this.submitted=true
    if(this.paymentForm.valid){
      this.isSpinner=true
      var data:any={
        amount:this.epf.amount.value.toString(),
        paymentMode:this.epf.paymentMode.value,
        date:this.epf.date.value,
        booking:this.bookingData._id,
        discountAmount:+this.epf.discountAmount.value,
        comments:this.epf.comments.value
      }
      if(this.epf.bankDetailId.value){
        data.bankDetailId=this.epf.bankDetailId.value;
      }

      this.bookingService.addTransaction(data).subscribe(resp=>{
        if(resp.status == "Success"){
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
