import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private api:Api) { }


  getCalenderBooking(startDate:any=null){
    let endpoint='bookings/monthWise-booking'
    if(startDate !=null)endpoint=endpoint+'?startDate='+startDate
    return this
    .api
    .get(endpoint)
  }

  setRoomwiseBooking(startDate:any=null){
    let endpoint='bookings/roomwise-booking'
    console.log(startDate)
    if(startDate !=null)endpoint=endpoint+'?startDate='+startDate
    return this
    .api
    .get(endpoint)
  }
}
