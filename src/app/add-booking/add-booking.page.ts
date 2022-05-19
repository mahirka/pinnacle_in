import { EventPublishService } from './../providers/event';
import { CommonService } from './../providers/common';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BookingService } from '../providers/booking.service';
import { RoomsService } from '../providers/rooms.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.page.html',
  styleUrls: ['./add-booking.page.scss'],
})
export class AddBookingPage implements OnInit {

  bookingForm:any=FormGroup
  submitted:boolean=false
  roomData:any=[]
  rooms:any=[]
  checkoutDate:any;
  isSpinner:boolean=false
  successResponse:any=[]
  minDate:any
  checkoutMinDate:any;
  isBookingRequest:boolean=false


  constructor(private fb:FormBuilder,private navParams:NavParams,public roomService:RoomsService,private booking:BookingService,public modalCtrl:ModalController,
    private datePipe:DatePipe,private common: CommonService, private event: EventPublishService) {

  }

  ngOnInit() {
    this.bookingForm=this.fb.group({
      email: [''],
      checkIn: ['',Validators.required],
      bookingDate: ['',Validators.required],
      checkOut: ['',Validators.required],
      name: ['',Validators.required],
      address: [''],
      phone: ['',Validators.required],
      whatsappNo: [''],
      // bookingStatus: REQUESTED,
      bookingAmount: ['',Validators.required],
      paidAmount: [''],
      balanceAmount: [''],
      guestDetails: [''],
      noOfAdults: [''],
      noOfKids: [''],
      // totalPeople: 0,
      guestPhoto: [''],
      idProof: [''],
      peoples:this.fb.array([])
    })
    this.addNewAddressGroup()
    this.getRooms()

    if (this.navParams.get('room')) {
      this.roomData=this.navParams.get('room')
   }
   if(this.navParams.get("booking_request")){
      this.isBookingRequest=this.navParams.get("booking_request")
      console.log(this.isBookingRequest)
   }
   if (this.navParams.get('checkInDate')) {
     console.log(this.navParams.get('checkInDate'))
     this.checkoutDate=this.navParams.get('checkInDate')
     let noOfNights=1;
     if(this.navParams.get('noOfNights')){
       noOfNights=+this.navParams.get('noOfNights');
     }
     this.minDate=this.datePipe.transform(Date(),'yyyy-MM-dd')
     this.bookingForm.get('bookingDate').patchValue(this.datePipe.transform(Date(),'yyyy-MM-dd'));
     this.bookingForm.get('checkIn').patchValue(this.datePipe.transform(this.navParams.get('checkInDate'),'yyyy-MM-dd'));
     this.checkoutMinDate=this.datePipe.transform(new Date(this.checkoutDate.setDate(this.checkoutDate.getDate() + noOfNights)),'yyyy-MM-dd')
     this.bookingForm.get('checkOut').patchValue(this.checkoutMinDate);
     this.bookingForm.get('bookingAmount').patchValue(this.roomData.price);

     if(this.isBookingRequest){
       console.log(this.roomData);
      this.bookingForm.get('name').patchValue(this.roomData.name);
      this.bookingForm.get('address').patchValue(this.roomData.address);
      this.bookingForm.get('phone').patchValue(this.roomData.phone);
      this.bookingForm.get('whatsappNo').patchValue(this.roomData.whatsappNo);
      this.bookingForm.get('bookingAmount').patchValue(this.roomData.roomId?.price);
      this.bookingForm.get('noOfAdults').patchValue(this.roomData.noOfAdults.toString());
      this.bookingForm.get('noOfKids').patchValue(this.roomData.noOfKids.toString());
     }
  }

  }


  getRooms(){
    this.roomService.getRooms().subscribe(resp=>{
      if(resp.status =='Success'){
         this.rooms=resp.data.lists
         this.removeRooms()
      }
    })
  }

  addNewAddressGroup() {
    const add = this.bookingForm.get('peoples') as FormArray;
    add.push(this.fb.group({
      noOfAdults: [''],
      noOfKids: [''],
      roomId:['',]
    }))
  }

  get epf() {return this.bookingForm.controls}


  addBooking(){
    this.submitted=true
    if(this.bookingForm.valid){
      this.isSpinner=true
      console.log(this.bookingForm.get('peoples'))
      this.bookingForm.get('peoples').value.forEach((element,index) => {
        var data={
          bookingDate:this.epf.bookingDate.value,
          checkIn:this.epf.checkIn.value,
          checkOut:this.epf.checkOut.value,
          email:this.epf.email.value,
          name:this.epf.name.value,
          address:this.epf.address.value,
          phone:this.epf.phone.value,
          whatsappNo:this.epf.whatsappNo.value,
          roomId:index == 0 && !this.isBookingRequest ?this.roomData._id :(this.isBookingRequest ? this.roomData.roomId?._id :element.roomId),
          noOfAdults:+element.noOfAdults,
          noOfKids:+element.noOfKids,
          bookingAmount:parseFloat(this.epf.bookingAmount.value),
          totalPeople:parseInt(element.noOfAdults+element.noOfKids != undefined ? element.noOfKids :0),
          bookingStatus:'REQUESTED'
        }

        if(this.isBookingRequest){
          data['bookingRequestId']=this.roomData._id
        }

        this.booking.addBooking(data).subscribe(resp=>{
          if(resp.status == 'Success'){
            this.submitted=false
            this.isSpinner=false
            this.successResponse=resp.data
            this.checkoutDate.setDate(this.checkoutDate.getDate() - 1)
            this.common.presentToast('Successfully Saved');
            this.event.publishSomeData("booking")
           this.modalCtrl.dismiss({
             resp:true,
             checkinDate:this.epf.checkIn.value,
             successResponse:this.successResponse
           })
          }
        },error=>{
          console.log(error);
          this.common.processError(error);
          this.submitted=false
          this.isSpinner=false
        })
      });
    }
  }

  closeModel(){
    this.modalCtrl.dismiss()
  }

  removeRooms(){
    this.rooms.forEach(element => {
      if(element._id == this.roomData._id){
        let index=this.rooms.findIndex(x=>x._id == this.roomData._id)
        this.rooms.splice(index,1)
      }
      if( this.bookingForm.get('peoples').value?.length > 0){
        this.bookingForm.get('peoples').value.forEach(element1 => {
          if(element._id == element1.roomId){
            let i=this.rooms.findIndex(x=>x._id == element1.roomId)
            this.rooms.splice(i,1)
          }
        });
      }
    });
  }



  // getCheckInDate(e){
  //   if(this.datePipe.transform(this.epf.checkIn.value,'dd MMM yyyy') >=  this.checkoutMinDate){
  //     this.checkoutMinDate=this.datePipe.transform(new Date(this.epf.checkIn.value.setDate(this.epf.checkIn.value.getDate() + 1)),'yyyy-MM-dd')
  //     this.bookingForm.get('checkOut').patchValue(this.checkoutMinDate);
  //   }
  // }
}
