import { AuthGuardService } from '../../../shared/services/auth-guard.service';
import { CartService } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';
import { OrderServiceService } from '../../../shared/services/order-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  products$;

  orderItem = {};

  totalOrderPrice: number = 0;


  constructor(private router: Router,
    private orderService: OrderServiceService,
    private cartService: CartService,
    private authGuardService: AuthGuardService) {

  }

  async ngOnInit() {


    this.products$ = await this.cartService.getCartProductsById();
    this.products$.map(r => { r.totalPrice = r.quantity * r.price, this.totalOrderPrice += r.totalPrice });
    this.products$.filter(r => delete r.id);
  }

  async placeOrder(order) {

    this.orderItem = {
      "datePlaced": new Date(),
      "oProducts": this.products$,
      "totalOrderPrice": this.totalOrderPrice,
      "shippingDetails": order,
      "userEmail": this.authGuardService.username
    }
    console.log(this.orderItem);
    let orderId = await this.orderService.placeOrder(this.orderItem);
    await this.cartService.clearCart();
    this.router.navigate(['/order-success', orderId]);
  }
}
