import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../providers/product.service';
import { RoomsService } from '../providers/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.page.html',
  styleUrls: ['./rooms-add.page.scss'],
})
export class RoomsAddPage implements OnInit {

  roomsAddForm:any=FormGroup
  roomImage:any;
  submitted:boolean=false
  productList:any=[]
  isSpinner:boolean=false

  constructor(private fb:FormBuilder,private room:RoomsService,private modalCtrl:ModalController,private product:ProductService) { }

  ngOnInit() {
    this.roomsAddForm=this.fb.group({
      name:['',Validators.required],
      description:['',],
      features:['',],
      occupancy:['',],
      price:['',],
      isActive:[''],
      kitchenSetAmount:[''],
      productManagement:this.fb.array([]),
      file:['']
    })
    this.addProduct()
    this.getProducts()
  }

  addProduct() {
    const add = this.roomsAddForm.get('productManagement') as FormArray;
    add.push(this.fb.group({
      quantity: [''],
      product: [''],
    }))
  }


  fileChangeEvent2(event: any) {
    this.roomImage = event.target.files[0]


    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null ) {return;}
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (_event) => {
    //   this.fileURL = reader.result;
    //   this.addAdvertisementGroup.controls['file'].setValue('set');
    //   console.log(this.file)
    // }
  }


  get epf(){return this.roomsAddForm.controls}


  addRooms(){
   this.submitted=true
   if(this.roomsAddForm.valid){
     this.isSpinner=true
     var data={
       name:this.epf.name.value,
       description:this.epf.description.value,
       features:this.epf.features.value,
       occupancy:this.epf.occupancy.value,
       price:this.epf.price.value,
       isActive:this.epf.isActive.value,
       kitchenSetAmount:this.epf.kitchenSetAmount.value,
       file:this.roomImage,
       productManagement: JSON.stringify(this.roomsAddForm.get('productManagement').value)
     }

     this.room.addRooms(data).subscribe(resp=>{
       if(resp.status == 'Success'){
         this.isSpinner=false
        this.modalCtrl.dismiss({
          resp:true,
        })
       }
     },error=>{
       this.isSpinner=false
     })
   }
  }


  closeModel(){
    this.modalCtrl.dismiss()
  }


  getProducts(){
   this.product.getProducts().subscribe(resp=>{
     if(resp.status == 'Success'){
       this.productList=resp.data.lists
     }
   })
  }


  getValue(e){
    this.roomsAddForm.get('isActive').patchValue(e.target.checked);
  }
}
