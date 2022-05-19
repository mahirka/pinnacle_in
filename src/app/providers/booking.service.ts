import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private api:Api) { }

  getBookingView(id){
    let endpoint='bookings/view/'+id
    return this
    .api
    .get(endpoint)
  }

  addBooking(data){
    let endpoint='booking/add'
    return this
    .api
    .post(endpoint,data)
  }

  addTransaction(data){
    let endpoint='transaction/payment/add'
    return this
    .api
    .post(endpoint,data)
  }

  addFoodDetails(data,isEdit:any=false,id:any=null){
    if(!isEdit){
    let endpoint='booking/expense/add'
    return this
    .api
    .post(endpoint,data)
    }else{
      let endpoint='booking/expense/'+id
      return this
      .api
      .put(endpoint,data)
    }
  }

  getTransactions(oId:any=null){
    let endpoint='transaction/view-all/payments'
    if(oId !=null)endpoint=endpoint+'?condition[booking]='+oId
    return this
    .api
    .get(endpoint)
  }

  checkIn(data,id){
    let endpoint='booking/'+id
    let fData = new FormData();
    for (var key in data) {
        fData.append(key, data[key]);
    }
    return this
    .api
    .postAsFormData(endpoint,fData)
  }

  getExpenseBooking(oId:any=null){
    let endpoint='bookings/expense/view-all'
    if(oId !=null)endpoint=endpoint+'?condition[booking]='+oId
    return this
    .api
    .get(endpoint)
  }

  checkOut(data,id){
    let endpoint='booking/'+id
    return this
    .api
    .put(endpoint,data)
  }

  getBookingRequests(){
    let endpoint='booking-requests/view-all'
    return this
    .api
    .get(endpoint)
  }

  getBookingRequestView(id){
    let endpoint='booking-requests/view/'+id
    return this
    .api
    .get(endpoint)
  }

  updateBookingRequest(data,id){
    let endpoint='booking-request/'+id
    return this
    .api
    .put(endpoint,data)
  }
  getBanks(){
    let endpoint='bank-detail/view-all'
    return this
    .api
    .get(endpoint)
  }

}
