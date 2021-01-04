import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

  create(product)
  {
    return this.db.list('/products').push(product);
  }
  createProduct(product)
  {
    return this.http.post('http://localhost:8080/admin/products/product', product);
  }

  getAllFire(): AngularFireList<any>{
    return this.db.list('/products');
  }

  getAll()
  {
    return this.http.get('http://localhost:8080/admin/products/product');
  }
  
  getProductById(productId)  {
    //return this.db.object('/products/' + productId).valueChanges();
    return this.http.get('http://localhost:8080/admin/products/product/' + productId);
  }

  updateProduct(productId,product)
  {
    return this.http.put('http://localhost:8080/admin/products/product/' + productId,product)
  }
}
