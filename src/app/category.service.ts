import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  
  getAll(): AngularFireList<any>
  {
     return this.db.list('/categories');
  }
}
