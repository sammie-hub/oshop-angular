import { CartService } from '../../../shared/services/cart.service';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
import { AppUser } from '../../../shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AppUser = {};

  result;

  constructor(private loginService: LoginService,
    private route: Router,
    private cartService: CartService) { }
    
  async ngOnInit() {
    await this.cartService.getCartProductsById();
  }

  // login()
  // {
  //   this.auth.login();
  // }

  login(user: AppUser) {
    this.loginService.loginUser(user).pipe(map(() => {
      this.result = "Login success";
    })).subscribe(data => {
      this.loginService.refreshToken();
      this.route.navigate(['/products']);
    },
      error => {
        this.result = "Incorrect Username or Password";
      });
  }

  register() {
    this.route.navigateByUrl("/register");
  }
}
