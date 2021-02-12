import { CartService } from '../../../shared/services/cart.service';
import { RegisterService } from '../../../shared/services/register.service';
import { AppUser } from '../../../shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: AppUser = {};
  result$;

  constructor(private registerService: RegisterService, private cartService: CartService) { }

  async ngOnInit() {
    await this.cartService.getCartProductsById();
  }

  register(user:AppUser, f: NgForm){
   this.registerService.register(user).then(r=>{
    this.result$ = r,
    f.reset();
   });
  }
}
