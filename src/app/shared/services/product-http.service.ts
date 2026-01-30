import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";
import {OrderDataType} from "../../../types/order-data.type";
import {ResponseType} from "../../../types/response.type";

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  constructor(private http: HttpClient) { }

  public getProducts(param: string = ''): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea?search=' + param);
  }

  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>('https://testologia.ru/tea?id=' + id);
  }

  public createOrder(data: OrderDataType): Observable<ResponseType> {
    return this.http.post<ResponseType>('https://testologia.ru/order-tea', data);
  }
}
