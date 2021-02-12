import { CartService } from '../../../shared/services/cart.service';
import { Products } from '../../../shared/models/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  totalCount: number;
  condition:boolean = false;
  cart$: Products[] = [];
  totalPrice:number;
  constructor(
    private cartService: CartService) {
  }


  async ngOnInit() {

    this.cartService.shoppingCartSubject.subscribe(x=>{
      this.totalCount =  x.getQuantity();
      this.condition = x.Condition;
      this.cart$ = x.listProducts;
      this.totalPrice = x.getTotalPrice();
     });
   this.cart$ = <Products[]>await this.cartService.getCartProductsById();
  }

  deleteAll(){
   this.cartService.clearCart();
  }

}
