import { AuthGuardService } from './auth-guard.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl+ "/order";
  
  constructor(private http: HttpClient, private authGuardService: AuthGuardService) { }

  placeOrder(orderItem){
    return this.http.post(this.url, orderItem).toPromise();
  }

  getAllAdminOrders()
  {
    return this.http.get(this.url);
  }
  getAllUserOrders()
  {
    let userEmail = this.authGuardService.username;
    return this.http.get(this.url+ '/' + userEmail);
  }
}
