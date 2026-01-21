import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductHttpService} from "../../../services/product-http.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];
  subscription: Subscription | null = null;

  constructor(private httpService: ProductHttpService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.httpService.getProducts().subscribe({
      next: (data) => {this.products = data;},
      error: (error) => {this.router.navigate(['/'])}
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
