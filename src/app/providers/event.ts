import {Injectable} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventPublishService {

    private dataSource = new BehaviorSubject<any>(0);
    data = this.dataSource.asObservable();

    private fooSubject = new Subject<any>();
    private fcmValue = new Subject<any>();
    private pauseTime = new Subject<any>();
    private ticket = new Subject<any>();
    private tab = new Subject<any>();
    private affair = new Subject<any>();
    private orderView = new Subject<any>();
    private cancelOrderStatus = new Subject<any>();
    private order = new Subject<any>();

    publishSomeData(data: any) {
        this.fooSubject.next(data);
    }

    publishFaveriteData(data: any) {
        this.fooSubject.next(data);
    }

    getObservable(): Subject<any> {
        return this.fooSubject;
    }

    publishOrderData(data: any) {
        this.order.next(data);
    }

    getOrderObservable(): Subject<any> {
        return this.order;
    }

    publishOrderViewData(data: any) {
        this.orderView.next(data);
    }

    getOrderViewObservable(): Subject<any> {
        return this.orderView;
    }

    publishCancelOrder(data: any) {
        this.cancelOrderStatus.next(data);
    }

    cancelOrderObservable(): Subject<any> {
        return this.cancelOrderStatus;
    }

    updateProfile(data) {
        this.dataSource.next(data);
    }
}
