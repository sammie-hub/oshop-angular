import { CartService } from '../../../shared/services/cart.service';
import { OrderServiceService } from '../../../shared/services/order-service.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Order } from 'app/shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders:Order[];
  isExpanded: number;
  
  constructor(private orderService: OrderServiceService, private cartService: CartService) { }

 async ngOnInit() {
    await this.cartService.getCartProductsById();
    let pipe = new DatePipe('en-IN');
    this.orderService.getAllAdminOrders().subscribe((r:Order[])=>{
      r.map(items => items.datePlaced = pipe.transform(items.datePlaced, 'EEEE, MMMM d, y, h:mm:ss a'));
      this.orders = r;
    })
  }
  onClick(index:number){
    (this.isExpanded == index) ? this.isExpanded = -1 : this.isExpanded = index;
  }

}
