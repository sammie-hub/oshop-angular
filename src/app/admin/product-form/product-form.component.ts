import { ProductCategory } from './../../models/product-category';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  //categories$; // $ because it is Observable
  product={};
  products: Products;
  categories$: ProductCategory[];
  id;
  categoryIndex;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) { 
   // this.categories$ = categoryService.getCategories();
    // this.categoryService.getAll().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.categories$ = data;
    //   //console.log(this.categories$);
    // });

    categoryService.getAll().subscribe(response => {
      this.categories$ = response;

    });
    
      // Get Product By Id
   this.id = this.route.snapshot.paramMap.get('id');
   
   if(this.id){
     this.productService.getProductById(this.id).take(1).subscribe(p => {
       this.product =p;
      });
   }
  }

  ngOnInit() {
   
  }


  save(product)
  {
    
    this.categoryIndex = +product['category'];
    this.categoryIndex = this.categoryIndex - 1;
    
    if(this.id)
    {
      this.products = new Products();
      this.products.title = product['title'];
      this.products.price = product['price'];
      this.products.category = this.categories$[this.categoryIndex];
      //this.products.category.name = "test";
      this.products.imageUrl = product['imageUrl'];
      
      
      //this.productService.create(product);
      this.productService.updateProduct(this.product['id'], this.products).subscribe(response => {
        console.log(response);
      });
    }
    else
    {
      this.products = new Products();
      this.products.title = product['title'];
      this.products.price = product['price'];
      this.products.category = this.categories$[this.categoryIndex];
      //this.products.category.name = "test";
      this.products.imageUrl = product['imageUrl'];
    
      //this.productService.create(product);
      this.productService.createProduct(this.products).subscribe(response => {
        console.log(response);
      });
    }
    
    this.router.navigate(['/admin/products']);
  }
}
