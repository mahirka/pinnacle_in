import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../providers/product.service';

@Component({
  selector: 'app-product-category-add',
  templateUrl: './product-category-add.page.html',
  styleUrls: ['./product-category-add.page.scss'],
})
export class ProductCategoryAddPage implements OnInit {

  productCategoryForm:any=FormGroup
  submitted:boolean=false

  constructor(private fb:FormBuilder,private productCategory:ProductService,private maodalCtrl:ModalController) { }

  ngOnInit() {
    this.productCategoryForm=this.fb.group({
      name:['',Validators.required],
      description:[''],
      isActive:[''],
    })
  }


  get epf(){return this.productCategoryForm.controls}

  addCategory(){
    if(this.productCategoryForm.valid){
     var data={
      name:this.epf.name.value,
       description:this.epf.description.value,
       isActive:this.epf.isActive.value,
     }
     this.productCategory.addCategory(data).subscribe(resp=>{
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
    this.productCategoryForm.get('isActive').patchValue(e.target.checked);
  }

}

