import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private api:Api) { }


  getStockList(){
    let endpoint='stock/view-all'
    return this
    .api
    .get(endpoint)
  }

  getStockView(id){
    let endpoint='stock/view/'+id
    return this
    .api
    .get(endpoint)
  }
}
