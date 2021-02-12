import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from 'environments/environment';

export enum RequestMethod {
  Get = 'GET',
  Head = 'HEAD',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Patch = 'PATCH'
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl;
  loginUrl: string = this.apiUrl+ "/login";
  logoutUrl:string = this.apiUrl+ "/logout";
  refreshUrl:string = this.apiUrl+ "/refresh";
  chngPassword: string = this.apiUrl + "/changePassword";

  name;
  userType;
  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  options = {
    headers: this.headers,
    withCredentials: true,
    params: undefined
  };

  constructor(private http: HttpClient, private route: Router) {
    this.refreshToken();
  }

  loginUser(user: AppUser) {

    const loginHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${user.email}&password=${user.password}`;
    return this.post(this.loginUrl, body, loginHeaders);
  }

  logout() {

    return this.post(this.logoutUrl, {}).pipe(map((r) => {
      this.name = null;
      if (r['result'] == "success") {
        this.route.navigate(['/products']);
      }
    }));;
  }
  post(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
    return this.request(path, body, RequestMethod.Post, customHeaders);
  }
  private request(path: string, body: any, method = RequestMethod.Post, custemHeaders?: HttpHeaders): Observable<any> {
    const req = new HttpRequest(method, path, body, {
      headers: custemHeaders || this.headers,
      withCredentials: true
    });

    return this.http.request(req).pipe(filter(response => response instanceof HttpResponse))
      .pipe(map((response: HttpResponse<any>) => response.body))
      .pipe(catchError(error => this.checkError(error)));
  }
  private checkError(error: any): any {
    if (error && error.status === 401) {
      // this.redirectIfUnauth(error);
    } else {
      // this.displayError(error);
    }
    throw error;
  }

  refreshToken() {
    this.http.get(this.refreshUrl, this.options).subscribe(r => {
      this.name = r['username'];
      this.userType = r['authourity'];
    });
  }
  changePassword(obj){
    console.log(obj.oldPassword, obj.newPassword);
    return this.http.post(this.chngPassword, obj, this.options);
  }
}
