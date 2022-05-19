import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TransactionService } from '../providers/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.page.html',
  styleUrls: ['./transaction-list.page.scss'],
})
export class TransactionListPage implements OnInit {

  transactionList:any=[]

  constructor(private transactions:TransactionService,private alertCtrl:AlertController,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getTransactionList()
  }
  getTransactionList(){

    this.transactions.getTransactionList().subscribe(resp=>{
      if(resp.status== 'Success'){
        
        this.transactionList=resp.data.lists
      }
    })
  }

}
