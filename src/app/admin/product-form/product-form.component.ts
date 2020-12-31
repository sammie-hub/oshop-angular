import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$; // $ because it is Observable

  constructor(categoryService: CategoryService, private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

  save(product)
  {
    console.log(product);
    this.productService.create(product);
  }
}
