import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private db: AngularFireDatabase) { }

  create(product)
  {
    return this.db.list('/products').push(product);
  }

  getAll(): AngularFireList<any>{
    return this.db.list('/products');
  }
  
  getProductById(productId): Observable<any>
  {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
