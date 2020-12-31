import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  shirts: Observable<any[]>;
  getCategories(): Observable<any[]>
  {
    this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        console.log(id, ...data );
        return { id, ...data };
      }))
    );
     console.log();
     this.db.list('/categories').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
     );
     return this.db.list('/categories').valueChanges();
  }
}
