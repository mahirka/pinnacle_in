import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductCategoryAddPage } from '../product-category-add/product-category-add.page';
import { ProductService } from '../providers/product.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {

  productCategories:any=[]

  constructor(private productCategory:ProductService,private alertCtrl:AlertController,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getProductCategories()
  }
  getProductCategories(){

    this.productCategory.getProductCategories().subscribe(resp=>{
      if(resp.status== 'Success'){
        
        this.productCategories=resp.data.lists
      }
    })
  }

  async addProductCategory(){
    const modal = await this.modalCtrl.create({
      component: ProductCategoryAddPage,
      cssClass: '',
      componentProps:{
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(async (data) => {
      if(data?.data?.response){
        this.getProductCategories()
      }
    })
  }

  async deleteProductCategory(id){
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
            this.productCategory.deleteProductCategory(id).subscribe(resp=>{
              if(resp.status == "Success"){
                let index= this.productCategories.findIndex(x=>x._id == id)
                this.productCategories.splice(index,1)
              }
            })
          }
        }
      ]
    });


    await alert.present();
  }

}
