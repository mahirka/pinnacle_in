import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { CommonService } from '../providers/common';
import { FeedbackService } from '../providers/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  questions: any = []
  customForm: any = FormGroup
  rating: any;
  comment: any;
  bookingDetails: any;
  viewFeedback=false;

  constructor(private feedback: FeedbackService, private common: CommonService, private navParams: NavParams, private modalCtrl: ModalController) {
    if (this.navParams.get("booking")) {
      this.bookingDetails = this.navParams.get("booking")
      this.viewFeedback=this.bookingDetails.feedback?._id?true:false;
      console.log(this.bookingDetails);
    }
  }

  getAnswer(id){
    if(this.bookingDetails?.feedback && this.bookingDetails?.feedback?.answers?.length>0){
      const curQues=this.bookingDetails?.feedback?.answers?.filter(x => x.question===id);
      return curQues[0]?.answer;
    }
    return '';
  }

  ngOnInit() {
    this.getQuestionsFeedback()
  }

  closeModel() {
    this.modalCtrl.dismiss()
  }


  getQuestionsFeedback() {
    this.feedback.getFeedbackQuestions().subscribe(resp => {
      if (resp.status == 'Success') {
        this.questions = resp.data.lists
        this.questions.forEach(element => {
          element.answer = null
        });
      }
    })
  }


  submiFeedback() {
    if (!this.comment) {
      this.common.presentToast("Please enter comment")
      return;
    }
    let feedbackArray: any = {}
    let answers: any = []
    let answeredAll = true;
    this.questions.forEach(element => {
      if (element.answer != null) {
        var data = {
          question: element._id,
          answer: element.answer
        }
        answers.push(data)
      } else {
        answeredAll = false
        return;
      }
    });
    if (!answeredAll) {
      this.common.presentToast("Please answer all questions");
      return;
    }
    feedbackArray.questions = answers
    feedbackArray.customer = this.bookingDetails.customer
    feedbackArray.roomId = this.bookingDetails.roomId._id
    feedbackArray.comment = this.comment
    feedbackArray.bookingId = this.bookingDetails._id
    console.log(feedbackArray)
    this.feedback.addFeedback(feedbackArray).subscribe(resp => {
      if (resp.status == 'Success') {
        this.common.presentToast("Successfully submitted")
        this.modalCtrl.dismiss()
      }
    }, error => {
      console.log(error);
      this.common.processError(error);
    })

  }

}
