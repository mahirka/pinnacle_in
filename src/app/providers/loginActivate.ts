import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ModalController } from '@ionic/angular';


import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { UserService } from './user';



@Injectable({ providedIn: 'root' })
export class LoginActivate implements CanActivate {
    constructor(private user: UserService, public router: Router,public modalCtrl:ModalController) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {


        if (!this.user.hasLoggedIn) {
            console.log('Not logged in ');
            this.presentLogin(state.url)
        } else {
            return true;
        }
    }

    
    async presentLogin(redirectUrl) {
        const modal = await this.modalCtrl.create({
            component: LoginComponent,
            cssClass: '',
          });
          await modal.present();
          await modal.onWillDismiss().then((data) => {
          })
        }
    
}






