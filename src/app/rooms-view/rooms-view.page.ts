import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RoomsService } from '../providers/rooms.service';

@Component({
  selector: 'app-rooms-view',
  templateUrl: './rooms-view.page.html',
  styleUrls: ['./rooms-view.page.scss'],
})
export class RoomsViewPage implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLElement>;
  @ViewChild('fileInput') task: ElementRef;

  roomId:any;
  roomData:any=[]
  products:any=[]
  baseUrl:any;

  constructor(private route:ActivatedRoute,private room:RoomsService,private alertCtrl:AlertController) { 
    this.route.params.subscribe(val=>{
      this.roomId=val['id']
    })
  }

  ngOnInit() {
    this.getRoomsView()
  }

  getRoomsView(){
    this.room.getRoomView(this.roomId).subscribe(resp=>{
      if(resp.status == 'Success'){
        this.roomData=resp.data.list
        this.baseUrl=resp.data.baseUrl
        this.products=JSON.parse(JSON.stringify(this.roomData.productManagement))
      }
    })
  }

  activeFileChoose() {
    let inputElement: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    this.task.nativeElement.className = 'hide';
    inputElement.click();

  }


  fileChangeEvent(event: any): void {
    if (event.target.files.length === 0) return;
    for (let i = 0; i < event.target.files.length; i++) {
      let image = event.target.files[i];
      var data={
        room:this.roomData._id,
        file:image
      }
     this.room.addMultipleImage(data).subscribe(resp=>{
       if(resp.status == 'Success'){
         this.roomData.images.push(resp.data)
       }
     })

      }

    }

    async deleteImage(id){
      const alert = await this.alertCtrl.create({
        header: 'Notification',
        subHeader: "Are You Sure You Want to Delete ? ",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Confirm Okay');
              var data={
               id:id.toString()
              }
              this.room.deleteImage(data).subscribe(resp=>{
                if(resp.status == "Success"){
                  let index= this.roomData.images.findIndex(x=>x._id == id)
                  this.roomData.images.splice(index,1)
                }
              })
            }
          }
        ]
      });
  
  
      await alert.present();
    }
  

}
