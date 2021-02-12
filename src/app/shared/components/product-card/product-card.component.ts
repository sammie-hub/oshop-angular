import { CartService } from '../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'app/shared/models/products';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Products;
  condition: boolean;

  productQuantity: number;
  result;

  constructor(private cartService: CartService) {
  }

  async ngOnInit() {

    this.cartService.shoppingCartSubject.subscribe(r => {

      let savedProducts = r.listProducts.filter(e => e.id == this.product.id);
      if (savedProducts.length > 0) {
        savedProducts.forEach(r => this.productQuantity = r.quantity);
      }
      else {
        this.productQuantity = 0;
      }

      this.condition = r.Condition;
    });
    
    
    
  }

  async addToCart(product) {
    await this.cartService.addToCart(product, 1);
  }
}
