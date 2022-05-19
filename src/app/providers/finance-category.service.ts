import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class FinanceCategoryService {

  constructor(private api:Api) { }


  getFinanceCategories(){
   let endpoint='transaction/view-all/category'
   return this
   .api
   .get(endpoint)
  }
  addCategory(data){
    let endpoint='transaction/category/add'
    return this
    .api
    .post(endpoint,data)
  }
  
  deleteFinanceCategory(id){
    let endpoint='transaction/category/'+id
    return this
    .api
    .delete(endpoint)
  }
  

}
