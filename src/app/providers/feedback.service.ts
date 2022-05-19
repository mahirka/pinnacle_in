import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private api:Api) { }


  getFeedbackQuestions(){
   let endpoint='feedback/question/view-all'
   return this
   .api
   .get(endpoint)
  }

  addQuestion(data){
    let endpoint='feedback/question/add'
    return this
    .api
    .post(endpoint,data)
  }

  deleteQuestion(id){
    let endpoint='feedback/question/'+id
    return this
    .api
    .delete(endpoint)
  }

  addFeedback(data){
    let endpoint='feedback/add'
    return this
    .api
    .post(endpoint,data)
  }

}
