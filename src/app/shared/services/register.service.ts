import { AppUser } from '../models/app-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl+ "/register";
  
  constructor(private http:HttpClient) { }


  async register(user:AppUser){
    user.isAdmin = "USER";
    return await this.http.post(this.url, user).toPromise();
  }
}
