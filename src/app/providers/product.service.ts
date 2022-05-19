import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api:Api) { }

  getProductCategories(){
    let endpoint='products/categories/view-all'
    return this
    .api
    .get(endpoint)
   }
   
   addCategory(data){
    let endpoint='product/category/add'
    return this
    .api
    .post(endpoint,data)
  }

  deleteProductCategory(id){
    let endpoint='product/category/'+id
    return this
    .api
    .delete(endpoint)
  }

  getProducts(){
    let endpoint='products/view-all'
    return this
    .api
    .get(endpoint)
  }

  addProduct(data){
    let endpoint='product/add'
    return this
    .api
    .post(endpoint,data)
  }
  
}
