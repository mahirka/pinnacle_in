import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private api:Api) { }


  getRooms(){
    let endpoint='rooms/view-all'
    return this
    .api
    .get(endpoint)
  }

  addRooms(data){
    let endpoint='room/add'
    let fData = new FormData();
    for (var key in data) {
        fData.append(key, data[key]);
    }
    return this
    .api
    .postAsFormDataImage(endpoint,fData)
  }

  getRoomView(id){
    let endpoint='rooms/view/'+id
    return this
    .api
    .get(endpoint)
  }

  addMultipleImage(data){
   let endpoint='room-image/add'
   let fData = new FormData();
   for (var key in data) {
       fData.append(key, data[key]);
   }
   return this
   .api
   .postAsFormDataImage(endpoint,fData)
  }

  deleteImage(data){
    let endpoint='room-image/image'
    return this
    .api
    .delete(endpoint)
  }
}
