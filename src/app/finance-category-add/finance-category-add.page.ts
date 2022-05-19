import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FinanceCategoryService } from '../providers/finance-category.service';

@Component({
  selector: 'app-finance-category-add',
  templateUrl: './finance-category-add.page.html',
  styleUrls: ['./finance-category-add.page.scss'],
})
export class FinanceCategoryAddPage implements OnInit {

  financeCategoryForm:any=FormGroup
  submitted:boolean=false

  constructor(private fb:FormBuilder,private financeCategory:FinanceCategoryService,private maodalCtrl:ModalController) { }

  ngOnInit() {
    this.financeCategoryForm=this.fb.group({
      name:['',Validators.required],
      description:[''],
      isActive:[''],
    })
  }


  get epf(){return this.financeCategoryForm.controls}

  addCategory(){
    if(this.financeCategoryForm.valid){
     var data={
      name:this.epf.name.value,
       description:this.epf.description.value,
       isActive:this.epf.isActive.value,
     }
     this.financeCategory.addCategory(data).subscribe(resp=>{
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
    this.financeCategoryForm.get('isActive').patchValue(e.target.checked);
  }

}
