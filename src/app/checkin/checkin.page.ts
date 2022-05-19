import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BookingService } from '../providers/booking.service';
import { EventPublishService } from '../providers/event';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {

  bookingData: any = []
  checkInForm: any = FormGroup
  idProof: any;
  fileChangedEvent: any;
  fileSize: any;
  guestPhoto: any;
  fileChangedEvent1: any;
  fileSize1: any;
  submitted: boolean = false
  adults: any = 2
  isSpinner: boolean = false
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

  constructor(private navParams: NavParams, private fb: FormBuilder, private bookingService: BookingService, private modalCtrl: ModalController, private datePipe: DatePipe, private event: EventPublishService) {
    if (this.navParams.get("booking")) {
      this.bookingData = this.navParams.get("booking")
    }
  }

  ngOnInit() {
    this.checkInForm = this.fb.group({
      name: ['', Validators.required],
      idProof: ['',],
      checkIn: ['', Validators.required],
      guestPhoto: [''],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      whatsappNo: [''],
      noOfAdults: ['', Validators.required],
      noOfKids: [''],
      useKitchenSet: [false],
      kitchenSetExpenseAmount: [''],
      guestDetails: this.fb.array([])
    })

    if (this.bookingData) {
      setTimeout(() => {
        this.checkInForm.get('name').patchValue(this.bookingData.name);
        this.checkInForm.get('checkIn').patchValue(this.datePipe.transform(this.bookingData.checkIn, 'yyyy-MM-dd'));
        this.checkInForm.get('address').patchValue(this.bookingData.address);
        this.checkInForm.get('phone').patchValue(this.bookingData.phone);
        this.checkInForm.get('whatsappNo').patchValue(this.bookingData.whatsappNo);
        this.checkInForm.get('noOfAdults').patchValue(this.bookingData.noOfAdults.toString());
        this.checkInForm.get('noOfKids').patchValue(this.bookingData.noOfKids.toString());
        this.checkInForm.get('kitchenSetExpenseAmount').patchValue(this.bookingData.roomId?.kitchenSetAmount);
      }, 500);
      console.log(this.bookingData)

    }

    this.addGuest()
  }


  addGuest() {
    const add = this.checkInForm.get('guestDetails') as FormArray;
    for (let index = 0; index < this.bookingData.noOfAdults; index++) {
      add.push(this.fb.group({
        name: [''],
        mobile: [''],
      }))
    }

  }


  fileChangeEvent(event: any): void {
    this.guestPhoto = event.target.files[0]
    this.fileChangedEvent1 = event;
    this.fileSize1 = Math.round(this.fileChangedEvent.target.files[0].size / 1024)

    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null ) {return;}
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (_event) => {
    //   this.fileURL = reader.result;
    //   this.addAdvertisementGroup.controls['file'].setValue('set');
    //   console.log(this.file)
    // }
  }

  fileChangeEvent2(event: any) {
    this.idProof = event.target.files[0]
    this.fileChangedEvent = event;
    this.fileSize = Math.round(this.fileChangedEvent.target.files[0].size / 1024)

    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null ) {return;}
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (_event) => {
    //   this.fileURL = reader.result;
    //   this.addAdvertisementGroup.controls['file'].setValue('set');
    //   console.log(this.file)
    // }
  }

  get epf() { return this.checkInForm.controls }

  checkIn() {
    console.log()
    console.log(this.idProof, this.guestPhoto)
    this.submitted = true
    if (this.checkInForm.valid) {
      this.isSpinner = true
      var data = {
        name: this.epf.name.value,
        idProof: this.idProof,
        checkIn: this.epf.checkIn.value,
        guestPhoto: this.guestPhoto,
        address: this.epf.address.value,
        phone: this.epf.phone.value,
        whatsappNo: this.epf.whatsappNo.value,
        noOfAdults: this.epf.noOfAdults.value,
        noOfKids: this.epf.noOfKids.value,
        guestDetails: JSON.stringify(this.checkInForm.get('guestDetails').value),
        bookingStatus: 'CHECKED_IN',
        useKitchenSet:  this.epf.useKitchenSet.value,
        kitchenSetExpenseAmount:  this.epf.kitchenSetExpenseAmount.value,
      }
      this.bookingService.checkIn(data, this.bookingData._id).subscribe(resp => {
        if (resp.status == 'Success') {
          this.event.publishSomeData("booking")
          this.isSpinner = false
          this.modalCtrl.dismiss()
        }
      }, error => {
        this.isSpinner = false
      })
    }
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

  closeModel() {
    this.modalCtrl.dismiss()
  }
}
