import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FinanceCategoryAddPage } from '../finance-category-add/finance-category-add.page';
import { FinanceCategoryService } from '../providers/finance-category.service';

@Component({
  selector: 'app-finance-category',
  templateUrl: './finance-category.page.html',
  styleUrls: ['./finance-category.page.scss'],
})
export class FinanceCategoryPage implements OnInit {

  financeCategories:any=[]

  constructor(private financeCategory:FinanceCategoryService,private alertCtrl:AlertController,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getFinanceCategories()
  }
  getFinanceCategories(){

    this.financeCategory.getFinanceCategories().subscribe(resp=>{
      if(resp.status== 'Success'){
        
        this.financeCategories=resp.data.lists
      }
    })
  }

  async deleteFinanceCategory(id){
    const alert = await this.alertCtrl.create({
      header: 'Notification',
      subHeader: "Are You Sure You Want to Delete ? ",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            var data={
             id:id.toString()
            }
            this.financeCategory.deleteFinanceCategory(id).subscribe(resp=>{
              if(resp.status == "Success"){
                let index= this.financeCategories.findIndex(x=>x._id == id)
                this.financeCategories.splice(index,1)
              }
            })
          }
        }
      ]
    });


    await alert.present();
  }


  async addFinanceCategory(){
    const modal = await this.modalCtrl.create({
      component: FinanceCategoryAddPage,
      cssClass: '',
      componentProps:{
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(async (data) => {
      if(data?.data?.response){
        this.getFinanceCategories()
      }
    })
  }


}
