import { Component, OnInit } from '@angular/core';
import { Products } from 'app/shared/models/products';

import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Products[];
  
  constructor(private productService: ProductService) { 
  
  this.productService.getAll().subscribe((response:Products[]) => {
    this.products = response;
  });
  }
  filter(query: string) { 

  }
  ngOnInit(): void {
  }

}
