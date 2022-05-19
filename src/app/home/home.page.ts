import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AddBookingPage } from '../add-booking/add-booking.page';
import { BookingSuccessPage } from '../booking-success/booking-success.page';
import { CalenderService } from '../providers/calender.service';
import { EventPublishService } from '../providers/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentDate: any = Date()
  daysArr: any = []
  activeDate: any = moment();
  public date = moment();
  currentMonth: any;

  roomsList: any = []
  constructor(public modalCtrl: ModalController, private calapi: CalenderService, private datePipe: DatePipe, private router: Router, private event: EventPublishService, private menu: MenuController) {
    this.event.getObservable().subscribe((data) => {
      if (data == 'booking') {
        this.getCalenderBooking()
        this.getRooms(this.activeDate)
      }
    })
  }

  ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
    console.log(this.daysArr)
    // setTimeout(() => {
    this.getCalenderBooking()
    this.getRooms(this.activeDate)
    // }, 300);
  }


  getCalenderBooking() {
    this.calapi.getCalenderBooking(this.currentDate).subscribe(resp => {
      if (resp.status == "Success") {
        resp.data.list.filter(element => {
          element.date = moment(element.date)
        });


        resp.data.list.forEach(element1 => {
          this.daysArr.forEach(element2 => {
            if (this.datePipe.transform(element1.date?._d, 'yyyy-MM-dd') == this.datePipe.transform(element2?._d, 'yyyy-MM-dd')) {
              element2.status = element1.confirmedBooking == element1.totalNoOfRooms ? 'green' : (element1.totalBooking <= 0 ? 'red' : 'orange')
            }
          });
        });
      }
    })
  }


  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
    console.log(this.daysArr)
    this.daysArr.forEach(element => {
      if (element != null) {
        this.currentDate = element._d
        return;
      }
    });


    this.getCalenderBooking()
  }

  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
    this.daysArr.forEach(element => {
      if (element != null) {
        this.currentDate = element._d
        return;
      }
    });
    this.getCalenderBooking()
  }


  getClass(status) {
    if (status == 'green') {
      return 'green'
    }
    if (status == 'orange') {
      return 'orange'
    }
    if (status == 'red') {
      return 'pink'
    }
  }


  getRooms(date) {
    console.log(date)
    if (date) {
      this.activeDate = date._d
      this.calapi.setRoomwiseBooking(this.datePipe.transform(date._d, 'yyyy-MM-dd')).subscribe(resp => {
        if (resp.status == 'Success') {
          this.roomsList = resp.data.list
        }
      })
    }
  }

  getRoomClass(data) {
    if (data.bookings?.length > 0) {
      if (data.bookings,data.bookings.filter(x => ['CONFIRMED','CHECKED_IN','CHECKED_OUT'].includes(x.bookingStatus)).length>0 ) {
        return 'main_card'
      }
      else if (data.bookings.filter(x => x.bookingStatus === 'REQUESTED').length>0) {
        return 'yellow_card'
      }
      else {
        return 'warning_card'
      }
    } else {
      return 'warning_card'
    }
  }

  openMenu() {
    this.menu.open();
  }


  async checkBooking(data) {
    const activeBooking:any=data.bookings.filter(x => ['REQUESTED','CONFIRMED','CHECKED_IN','CHECKED_OUT'].includes(x.bookingStatus));
    if (activeBooking?.length > 0) {
      this.router.navigate(['/booking-details', activeBooking[0]._id])
    } else {
      var checkDate = moment(this.activeDate).format('MM/DD/YYYY')
      var currentDate = moment(Date()).format('MM/DD/YYYY')
      if (checkDate >= currentDate) {
        const modal = await this.modalCtrl.create({
          component: AddBookingPage,
          cssClass: '',
          componentProps: {
            room: data.room,
            checkInDate: this.activeDate,
          }
        });
        await modal.present();
        await modal.onWillDismiss().then(async (data) => {
          console.log(data)
          if (data?.data?.resp) {
            this.getRooms(moment(data.data.checkinDate))
            // const modal = await this.modalCtrl.create({
            //   component: BookingSuccessPage,
            //   cssClass: '',
            //   componentProps:{
            //     successResponse:data.data.successResponse,
            //   }
            // });
            // await modal.present();
            // await modal.onWillDismiss().then((data) => {
            // })
          }

        })
      }
    }
  }
}
