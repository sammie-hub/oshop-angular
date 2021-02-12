import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../models/product-category';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl+ "/admin/categories";
  
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<ProductCategory[]>
  {
    return this.http.get<ProductCategory[]>(this.url);
  }
}
