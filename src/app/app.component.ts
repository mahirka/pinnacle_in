import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from './providers/user';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'Home' },
    { title: 'Rooms', url: '/rooms-list', icon: 'laptop' },
    { title: 'Booking Request', url: '/booking-request-list', icon: 'paper-plane' },
    { title: 'Feedback Question', url: '/feedback-questions-list', icon: 'Add' },
    { title: 'Stock', url: '/stock-list', icon: 'Star' },
    // { title: 'Transaction', url: '/transaction', icon: 'document' },
    // { title: 'Add Transaction', url: '/add-transaction', icon: 'add-circle' },
  ];

  public appLabels = [
    { label: 'Finance', url: '/finance-category', icon: 'paper-plane' },
    { label: 'Products', url: '/product-categories', icon: 'laptop' },
    { label: 'Transactions', url: '/transaction', icon: 'Star' },
    
  ];

  constructor(public user:UserService,private menu: MenuController) {}


  ngOnInit() {
   this.user.loadUser()
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
