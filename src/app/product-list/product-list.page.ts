import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddProductsPage } from '../add-products/add-products.page';
import { ProductService } from '../providers/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  stockList:any=[]

  constructor(private productService:ProductService,private router:Router,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
  this.productService.getProducts().subscribe(resp=>{
    if(resp.status == 'Success'){
     this.stockList=resp.data.lists
    }
  })
}
async addProduct(){
  const modal = await this.modalCtrl.create({
    component: AddProductsPage,
    cssClass: '',
    componentProps:{
    }
  });
  await modal.present();
  await modal.onWillDismiss().then(async (data) => {
    if(data?.data?.response){
      this.getProducts()
    }
  })
}



}
