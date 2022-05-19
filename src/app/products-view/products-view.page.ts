import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherService } from '../providers/other.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.page.html',
  styleUrls: ['./products-view.page.scss'],
})
export class ProductsViewPage implements OnInit {

  productId:any;
  stockData:any=[]

  constructor(private route:ActivatedRoute,private other:OtherService) { 
    this.route.params.subscribe(val=>{
      this.productId=val['id']
    })
  }

  ngOnInit() {
    this.getProductView()
  }

  getProductView(){
   this.other.getStockView(this.productId).subscribe(resp=>{
     if(resp.status =='Success'){
       this.stockData=resp.data
     }
   })
  }

}
