import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from './models/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }
  
  getAllFire(): AngularFireList<any>
  {
     return this.db.list('/categories');
  }

  getAll(): Observable<ProductCategory[]>
  {
    return this.http.get<ProductCategory[]>('http://localhost:8080/admin/categories');
  }
}
