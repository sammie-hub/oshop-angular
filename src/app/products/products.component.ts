import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../src/app/category.service';
import { ProductService } from './../../../src/app/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
//import { Product } from '../models/product';
import { Products } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //products: Products[]=[]; 
  products; 
  filteredProducts: Products[] = [];
  categories$; // $ because it is Observable
  category: string;

  constructor(private productService: ProductService,
     private categoryService: CategoryService, 
     private route: ActivatedRoute) { 
    
    // Get Products
    // this.productService.getAllFire().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.products = data;
    //     //Filter according to categories
    // route.queryParamMap.subscribe(params => {
    //   this.category =params.get('category');
    //   this.filteredProducts = (this.category) ?
    //   this.products.filter(p => p.category === this.category) :
    //   this.products;
    // });
    // });

    // Get categories
    // this.categoryService.getAllFire().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.categories$ = data;
    //   //console.log(this.categories$);
    // });
    
  /*
  Spring Boot API Calls
  */
  // Get all products

  this.productService.getAll().subscribe(response => {
   this.products= response;
   route.queryParamMap.subscribe(params => {
      this.category =params.get('category');
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category.id === +this.category) :
      this.products;
    });
  })
    // Get all categories

    this.categoryService.getAll().subscribe(response => {
      this.categories$ = response;
    })
  
  }

  ngOnInit(): void {
  }

}
