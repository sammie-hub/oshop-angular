import { ProductService } from './../../../../src/app/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$;
  constructor(private productService: ProductService) { 
   // this.products$ = this.productService.getAll();

  //   this.productService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.key, ...c.payload.val() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.products$ = data;
  //     console.log(this.products$);
  //   });
  // console.log(this.productService.getAll());
  this.productService.getAll().subscribe(response => {
    this.products$ = response;
  });
  }

  ngOnInit(): void {
  }

}
