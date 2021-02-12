import { AuthGuardService } from '../shared/services/auth-guard.service';
import { LoginService } from '../shared/services/login.service';
import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  totalCount:number=0;
  auth$;
  name;
  authourity;
  constructor(public auth: AuthService,private authGuardService: AuthGuardService,
    private cartService: CartService, private loginService: LoginService) { 
      
  }

  async ngOnInit() {

    this.cartService.shoppingCartSubject.subscribe(x=>{
      this.totalCount =  x.getQuantity();
     });
  }

  logout()
  {
   this.loginService.logout().subscribe();
  }

  hasSignedIn() {
    return !!this.loginService.name;
  }
  username(){
    this.name = this.loginService.name;
    this.authourity = this.loginService.userType;
    return this.name;
  }
  authority(){
    this.authourity = this.authGuardService.userType;
    return this.authourity;
  }
}
