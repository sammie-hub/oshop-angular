import { CartService } from '../../../shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../../shared/models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Products[] = [];
  filteredProducts: Products[] = [];
  category: number;
  result;

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private cartService: CartService) {
  }

  async ngOnInit() {
    this.populateProducts();
    this.result = await this.cartService.getCartProductsById();
  }

  private populateProducts() {

    this.productService.getAll().subscribe((response: Products[]) => {
      this.products = response;
      this.route.queryParamMap.subscribe(params => {
        this.category = +params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => parseInt(p.category['id']) === this.category)
          : this.products;
      });
    });
  }
}
