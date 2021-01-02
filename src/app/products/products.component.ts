import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../src/app/category.service';
import { ProductService } from './../../../src/app/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []; 
  filteredProducts: Product[] = [];
  categories$; // $ because it is Observable
  category: string;

  constructor(private productService: ProductService,
     private categoryService: CategoryService, 
     private route: ActivatedRoute) { 
    
    // Get Products
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.products = data;
        //Filter according to categories
    route.queryParamMap.subscribe(params => {
      this.category =params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
    });
    });

    // Get categories
    this.categoryService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categories$ = data;
      //console.log(this.categories$);
    });


  
  }

  ngOnInit(): void {
  }

}
