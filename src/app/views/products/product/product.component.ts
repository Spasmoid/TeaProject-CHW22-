import {Component, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductHttpService} from "../../../shared/services/product-http.service";
import {Subscription} from "rxjs";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }]
})
export class ProductComponent implements OnInit, OnDestroy {

  public product: ProductType = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    description: ''
  }
  private subscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productHttpService: ProductHttpService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productHttpService.getProduct(+params['id']).subscribe({
          next: (data) => {this.product = data;},
          error: (error) => {this.router.navigate(['/'])}
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
