import { LoginService } from './login.service';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private http: HttpClient, private loginService: LoginService) { }

  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  username;
  userType;
  apiUrl = environment.apiUrl;
  refreshUrl: string = this.apiUrl + "/refresh";
  canActivate(route, state: RouterStateSnapshot) {
    const options = {
      headers: this.headers,
      withCredentials: true,
      params: undefined
    };
    return this.http.get(this.refreshUrl, options).map(r => {
      this.userType = r['authourity'];
      this.username = r['username'];
      if (r['access_token'] != null) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    })
  }
}
