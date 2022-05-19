import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BookingService } from '../providers/booking.service';
import { EventPublishService } from '../providers/event';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {


  checkout:any
  bookingData:any=[]
  dueAmount:any;
  payment_mode:any;
  isDue:boolean=false
  isSpinner:boolean=false
  checklists: any = [
    {
      label: 'Check List one',
      answer: false
    },
    {
      label: 'Check List two',
      answer: false
    },
    {
      label: 'Check List three',
      answer: false
    }

  ]

  constructor(private navParams:NavParams,private datePipe:DatePipe,private bookingService:BookingService, private modalCtrl :ModalController,private event :EventPublishService) { 
   if(this.navParams.get("booking")){
     this.bookingData=this.navParams.get("booking")
     this.checkout=this.datePipe.transform(this.bookingData.checkOut,'yyyy-MM-dd')
   }
  }

  ngOnInit() {
   this.getDue()
  }


  getDue(){
   this.dueAmount=((this.bookingData?.bookingAmount + this.bookingData?.totalExpenseAmount)-this.bookingData.paidAmount)
  }


  Submit(){
     if(this.dueAmount > 0){
    var data={
      amount:this.dueAmount.toString(),
      paymentMode:this.payment_mode,
      date:this.bookingData.checkOut,
      booking:this.bookingData._id
    }

    this.bookingService.addTransaction(data).subscribe(resp=>{
      if(resp.status == "Success"){
        this.isSpinner=true
        var data1={
          bookingStatus:'CHECKED_OUT',
          checkIn:this.bookingData.checkIn,
          address:this.bookingData.address,
          phone:this.bookingData.phone,
          whatsappNo:this.bookingData.whatsappNo,
          noOfAdults:this.bookingData.noOfAdults,
          noOfKids:this.bookingData.noOfKids,
        }
        this.bookingService.checkOut(data1,this.bookingData._id).subscribe(resp=>{
          if(resp.status == 'Success'){
            this.isSpinner=false
            this.modalCtrl.dismiss()
          }
        })
      }
    })
  }else{
    this.isSpinner=true
    var data1={
      bookingStatus:'CHECKED_OUT',
      checkIn:this.bookingData.checkIn,
      address:this.bookingData.address,
      phone:this.bookingData.phone,
      whatsappNo:this.bookingData.whatsappNo,
      noOfAdults:this.bookingData.noOfAdults,
      noOfKids:this.bookingData.noOfKids,
    }
    this.bookingService.checkOut(data1,this.bookingData._id).subscribe(resp=>{
      if(resp.status == 'Success'){
        this.event.publishSomeData("booking")
        this.isSpinner=false
        this.modalCtrl.dismiss()
      }
    })
  }

  if(this.isDue){

  }
  }

  closeModel(){
    this.modalCtrl.dismiss()
  }


  get checklistValidation() {
    let validation = true
    this.checklists.forEach(element => {
      if (!element.answer) {
        validation = false
      }
    });
    return validation;
  }
}
