import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class CommonService {

    constructor(private toastCtrl:ToastController){

    }


    async  presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            duration: 2000
        });
        toast.present();
    }

    isLoginError(response:any) {
      console.log(response);
      try {
          if (response._body) {
              let body = JSON.parse(response._body);
              if (body.message && body.message == 'Invalid API key') {
                  return true;
              }
          } else if (response.body) {
              let body = JSON.parse(response.body);
              if (body.message && body.message == 'Invalid API key') {
                  return true;
              }
          }
      } catch (error) {
          console.log(error)
      }
      return ((response.data && response.data.message && response.data.message.trim() == "Invalid API key") || response.status == 403)
  }

    processError(err) {
      console.log(err);
      //console.log(err.json());
      if (!navigator.onLine) {
          this.presentToast('No Internet Connection. Please turn ON your data or wifi');
          return;
      }
      if (this.isLoginError(err)) {
          this.presentToast('Invalid Login. Please login again');
          // let modal = this.modalCtrl.create('LoginPage'); modal.present();

      } else {
          if (err.status == 401) {
              this.presentToast("User Expired. Please Login Again");
              return;
          }
          let error = 'Something Went wrong';
          if(err.error && err.error.message){
              error=err.error.message;
          }else if(err.error && err.error.error){
            error=err.error.error;
          }else{
              try {
                  let body:any = err.json();
                  if (body.message) {
                      error = String(body.message).replace(/<[^>]+>/gm, '')
                  }
              } catch (e) {

              }
          }
          this.presentToast(error);

      }
  }
}
