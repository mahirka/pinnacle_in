import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private api:Api) { }


  getTransactionList(){
   let endpoint='transaction/view-all'
   return this
   .api
   .get(endpoint)
  }
}
