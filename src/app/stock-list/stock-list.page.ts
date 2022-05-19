import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtherService } from '../providers/other.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.page.html',
  styleUrls: ['./stock-list.page.scss'],
})
export class StockListPage implements OnInit {

  stockList:any=[]

  constructor(private otherService:OtherService,private router:Router) { }

  ngOnInit() {
    this.getStockList()
  }

getStockList(){
  this.otherService.getStockList().subscribe(resp=>{
    if(resp.status == 'Success'){
     this.stockList=resp.data.lists
    }
  })
}

openView(id){
this.router.navigate(['/products-view/',id])
}

}
