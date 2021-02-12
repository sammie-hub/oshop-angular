import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl+ "/admin/products/product/";

  constructor(private http: HttpClient) { }

  addProduct(product)
  {
    return this.http.post(this.url, product).toPromise();
  }

  getAll()
  {
    return this.http.get(this.url);
  }
  
  getProductById(productId)  {
    return this.http.get(this.url + productId);
  }

  updateProduct(productId,product)
  {
    return this.http.put(this.url + productId, product).toPromise();
  }

  delete(productId){
    return this.http.delete(this.url + productId).toPromise();
  }
}
