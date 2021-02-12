import { CartService } from '../../../shared/services/cart.service';
import { OrderServiceService } from '../../../shared/services/order-service.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders:Order[];
  isExpanded: number;
  constructor(private orderService: OrderServiceService, private cartService: CartService) { }

  async ngOnInit() {
    await this.cartService.getCartProductsById();
    let pipe = new DatePipe('en-IN');
    this.orderService.getAllUserOrders().subscribe((r:Order[])=>{
      r.map(items => items.datePlaced = pipe.transform(items.datePlaced, 'EEEE, MMMM d, y, h:mm:ss a'));
      this.orders = r;
      console.log(r);
    },
    error =>{
      console.log("empty");
    });
  }
  onClick(index:number){
    (this.isExpanded == index) ? this.isExpanded = -1 : this.isExpanded = index;
  }

}
