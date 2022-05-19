import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api:Api) { }

  login(data){
    let endpoint='user/login'
    return this
    .api
    .post(endpoint,data)
  }
}
