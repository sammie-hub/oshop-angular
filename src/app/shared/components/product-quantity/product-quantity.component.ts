import { CartService } from '../../services/cart.service';
import { Products } from '../../models/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Products;
  @Input('quantity') productQuantity: number;
  @Input('condition') condition: boolean = false;
  constructor(
    private cartService: CartService) { }

  ngOnInit(): void {
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

  async addToCart(product: Products) {
    await this.cartService.addToCart(product, 1);
  }

  async removeProduct(product) {
    await this.cartService.removeFromCart(product, -1);
  }
}
