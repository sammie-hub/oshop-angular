import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import { ShoppingCartSubject } from '../models/shoppingCartSubject';
import { Products } from '../models/products';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl+ "/cart";
  shoppingCartSubject = new Subject<ShoppingCartSubject>();

  constructor(private http: HttpClient) {   }

  async addToCart(product: Products, change: number) {
    let cartId = await this.getOrCreateCartId();
    this.getCartItem(cartId, product.id).subscribe(async (r: Products) => {
      let quantity = (r.quantity || 0) + change;
      product.quantity = quantity;

      let lProduct = <Products[]>await this.getCartProductsById();
      (quantity == 1 && change !== -1) ? lProduct.push(product) : lProduct.filter(r => r.id == product.id)
        .map(x => { x.quantity = product.quantity; return x });
      if (quantity == 0) lProduct = lProduct.filter(r => r.id !== product.id);
      let scs = this.communicationToComponent(lProduct);
      await this.addProduct(lProduct);
      scs.Condition = false;
      this.shoppingCartSubject.next(scs);
    });
  }

  communicationToComponent(lProduct: Products[]) {
    let scs = new ShoppingCartSubject();
    scs.Condition = true;
    scs.listProducts = lProduct;
    this.shoppingCartSubject.next(scs);
    return scs;
  }

  async removeFromCart(product: Products, change: number) {
    await this.addToCart(product, change);
  }

  async clearCart() {
    let scs = this.communicationToComponent([]);
    await this.addProduct([]);
    scs.Condition = false;
    this.shoppingCartSubject.next(scs);
  }
  private addProduct(lProduct) {

    let IShoppingCart = {
      id: +localStorage.getItem('cartId'),
      dateTime: new Date(),
      products: lProduct,
      totalProducts: 1
    }
    return this.http.post(this.url, IShoppingCart).toPromise();
  }

  async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    console.log(cartId);
    let result = await this.createCart();
    localStorage.setItem('cartId', JSON.stringify(result));
    return JSON.stringify(result)
  }

  private createCart() {
    return this.http.post(this.url, { "localDateTime": new Date() }).toPromise();
  }

  async getCartProductsById() {
    let cartId = await this.getOrCreateCartId();
    let cartProducts = this.http.get(this.url + "/" + cartId).toPromise();
    let lProducts = <Products[]>await cartProducts;
    let scp = new ShoppingCartSubject();
    scp.listProducts = lProducts;
    this.shoppingCartSubject.next(scp);
    return cartProducts;
  }


  private getCartItem(cartId, productId) {
    return this.http.get(this.url + "/" + cartId + "/" + productId);
  }
}
