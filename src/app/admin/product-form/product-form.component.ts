import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$; // $ because it is Observable
  product={};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) { 
   // this.categories$ = categoryService.getCategories();
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

  ngOnInit() {
     // Get Product By Id
   let id = this.route.snapshot.paramMap.get('id');
   
   if(id){
     this.productService.getProductById(id).take(1).subscribe(p => {
       this.product =p;
      });
   }
  }


  save(product)
  {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
