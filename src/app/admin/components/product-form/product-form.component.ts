import 'rxjs/add/operator/take';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'app/shared/models/products';

import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  //categories$; // $ because it is Observable
  product = {};
  saveProduct = {};
  products: Products;
  categories$;
  id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    categoryService.getAll().subscribe(r => this.categories$ = r);

    // Get Product By Id
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id).take(1).subscribe(p => {
        this.product = p;
      });
    }
  }

  async save(product) {

    this.saveProduct = {
      title: product.title,
      price: product.price,
      category: this.categories$[product.category-1],
      imageUrl: product.imageUrl,
    }
    if (this.id) await this.productService.updateProduct(this.product['id'], this.saveProduct);
    else await this.productService.addProduct(this.saveProduct);

    this.router.navigate(['/admin/products']);
  }

  async delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
