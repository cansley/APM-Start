import {Injectable} from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class ProductService {
  private _productUrl = './api/products/products.json';
  constructor(private _http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productUrl)
      .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(productId: number): Observable<IProduct> {
    var currentproducts: IProduct[];
    var product: IProduct;
    this.getProducts().subscribe(
      products => currentproducts = products,
      error => {},
      completed => product = currentproducts.find(() => { return true;}, productId)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }
}
