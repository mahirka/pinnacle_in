import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoomsService } from '../providers/rooms.service';
import { RoomsAddPage } from '../rooms-add/rooms-add.page';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.page.html',
  styleUrls: ['./rooms-list.page.scss'],
})
export class RoomsListPage implements OnInit {

  roomList:any=[]

  constructor(private rooms:RoomsService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getRooms()
  }


  getRooms(){
    this.rooms.getRooms().subscribe(resp=>{
      if(resp.status == 'Success'){
       this.roomList=resp.data.lists
      }
    })
  }


  async addRooms(){
    const modal = await this.modalCtrl.create({
      component: RoomsAddPage,
      cssClass: '',
      componentProps:{
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(async (data) => {
      if(data?.data?.resp){
        this.getRooms()
      }
    })
  }
}
