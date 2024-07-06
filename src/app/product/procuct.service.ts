import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProcuctService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
  addEditProduct(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.http.post('https://fakestoreapi.com/products?', postData);
    } else {
      return this.http.put(`https://fakestoreapi.com/products/${selectedPdt.id}`, postData)
    }
  }
  deleteProduct(productId: number) {
    return this.http.delete(`https://fakestoreapi.com/products/${productId}`);

  }

  getChartData() {
    return this.http.get('https://fakestoreapi.com/products');
  }
}
