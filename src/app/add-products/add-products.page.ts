import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../providers/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  productAddForm:any=FormGroup
  submitted:boolean=false
  productCategories=[]

  constructor(private fb:FormBuilder,private productCategory:ProductService,private maodalCtrl:ModalController) { }

  ngOnInit() {
    this.getProductCategories()
    this.productAddForm=this.fb.group({
      name:['',Validators.required],
      description:[''],
      product_category:['',Validators.required],
      isActive:[''],
      quantity:[''],
    })
  }
  getProductCategories(){

    this.productCategory.getProductCategories().subscribe(resp=>{
      if(resp.status== 'Success'){
        
        this.productCategories=resp.data.lists
      }
    })
  }

  get epf(){return this.productAddForm.controls}

  addProduct(){
    if(this.productAddForm.valid){
     var data={
      name:this.epf.name.value,
       description:this.epf.description.value,
       product_category:this.epf.product_category.value,
       quantity:this.epf.quantity.value,
       isActive:this.epf.isActive.value,
     }
     this.productCategory.addProduct(data).subscribe(resp=>{
       if(resp.status == 'Success'){
          this.maodalCtrl.dismiss({
            response:true
          })
       }
     })
    }
  }

  closeModel(){
    this.maodalCtrl.dismiss()
  }

  getValue(e){
    this.productAddForm.get('isActive').patchValue(e.target.checked);
  }

  changeProductCategory(e) {
    console.log("selected product_category")
    console.log(e.target.value)
    this.productAddForm.get('product_category').setValue(e.target.value);
    // this.tempSubCategories = []
    // this.tempSubCategories = this.vehicle_makes.filter(
    //   entity => entity.categoryId === e.target.value.split(',').pop()
    // )
    
    
  }

}
