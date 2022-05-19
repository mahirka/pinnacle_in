import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FeedbackService } from '../providers/feedback.service';

@Component({
  selector: 'app-feedback-questions-add',
  templateUrl: './feedback-questions-add.component.html',
  styleUrls: ['./feedback-questions-add.component.scss'],
})
export class FeedbackQuestionsAddComponent implements OnInit {

  feedbackForm:any=FormGroup
  submitted:boolean=false

  constructor(private fb:FormBuilder,private feedback:FeedbackService,private maodalCtrl:ModalController) { }

  ngOnInit() {
    this.feedbackForm=this.fb.group({
      title:['',Validators.required]
    })
  }


  get epf(){return this.feedbackForm.controls}

  addQuestion(){
    if(this.feedbackForm.valid){
     var data={
       title:this.epf.title.value
     }
     this.feedback.addQuestion(data).subscribe(resp=>{
       if(resp.status == 'Success'){
          this.maodalCtrl.dismiss({
            response:true
          })
       }
     })
    }
  }

  closeModel(){
    this.maodalCtrl.dismiss()
  }
}
