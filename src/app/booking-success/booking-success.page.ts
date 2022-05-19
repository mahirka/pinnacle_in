import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.page.html',
  styleUrls: ['./booking-success.page.scss'],
})
export class BookingSuccessPage implements OnInit {

  successData:any=[]

  constructor(private navParams:NavParams,private modalCtrl:ModalController) { 
    if(this.navParams.get("successResponse")){
      this.successData=this.navParams.get("successResponse")
    }
  }

  ngOnInit() {
  }


  closeModel(){
    this.modalCtrl.dismiss()
  }
}
