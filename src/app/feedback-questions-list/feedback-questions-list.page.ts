import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FeedbackQuestionsAddComponent } from '../feedback-questions-add/feedback-questions-add.component';
import { FeedbackService } from '../providers/feedback.service';

@Component({
  selector: 'app-feedback-questions-list',
  templateUrl: './feedback-questions-list.page.html',
  styleUrls: ['./feedback-questions-list.page.scss'],
})
export class FeedbackQuestionsListPage implements OnInit {

  questions:any=[]

  constructor(private feedback:FeedbackService,private alertCtrl:AlertController,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getFeedbackQuestions()
  }

  getFeedbackQuestions(){
    this.feedback.getFeedbackQuestions().subscribe(resp=>{
      if(resp.status== 'Success'){
        this.questions=resp.data.lists
      }
    })
  }

  async deleteQuestion(id){
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
            this.feedback.deleteQuestion(id).subscribe(resp=>{
              if(resp.status == "Success"){
                let index= this.questions.findIndex(x=>x._id == id)
                this.questions.splice(index,1)
              }
            })
          }
        }
      ]
    });


    await alert.present();
  }


  async addQuestions(){
    const modal = await this.modalCtrl.create({
      component: FeedbackQuestionsAddComponent,
      cssClass: '',
      componentProps:{
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(async (data) => {
      if(data?.data?.response){
        this.getFeedbackQuestions()
      }
    })
  }

}