import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup
  submitted:boolean=false

  constructor(public fb:FormBuilder,private auth:AuthService,public user:UserService,public router:Router,public modalCtrl:ModalController) { }

  ngOnInit() {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }


  get apf(){return this.loginForm.controls}


  onSubmitMobile(){
    this.submitted=true
    if(this.loginForm.valid){
      var data={
        username:this.apf.username.value,
        userType: "Admin",
        password:this.apf.password.value
      }
      this.auth.login(data).subscribe(resp=>{
        if(resp.status =="Success"){
          this.user.updateLoginData(resp)
          this.modalCtrl.dismiss()
          this.router.navigate(['/home'])
        }
      })
    }
  }
}
