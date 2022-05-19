import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiKey:any;
  profile:any=[]
  PROFILE = 'khaazUserProfile';
  MENTOR_PROFILE = 'khaazMentorProfile';
  APIKEY = 'khaazApiKey';
  HAS_LOGGED_IN = 'khaazHasLoggedIn';
  
  hasLoggedIn:boolean=false
  public login_mobile: any = '';
  login_otp_resend_timer: any = null;


  constructor() { }

  updateLoginData(res) {
    // this.profile = res.data;
    this.apiKey = res.data.userToken;
    this.hasLoggedIn = true;
    // localStorage.setItem(this.PROFILE, JSON.stringify(this.profile));
    localStorage.setItem(this.APIKEY, this.apiKey);
    localStorage.setItem(this.HAS_LOGGED_IN, JSON.stringify(true));
  }

  loadUser() {
    if(localStorage.getItem(this.APIKEY)){
      this.apiKey = localStorage.getItem(this.APIKEY);
      this.hasLoggedIn = true;
    }else{
      this.logout()
    }
    // if(JSON.parse(localStorage.getItem(this.PROFILE))){
    //   this.profile = JSON.parse(localStorage.getItem(this.PROFILE));
    // }else{
    // }


  }


  logout() {
    localStorage.removeItem(this.PROFILE)
    localStorage.removeItem(this.APIKEY)
    localStorage.removeItem(this.HAS_LOGGED_IN)
    localStorage.clear()
    this.hasLoggedIn = false;
  }
  
}
