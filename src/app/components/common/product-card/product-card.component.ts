import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }]
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductType = {} as ProductType;

  constructor() { }

  ngOnInit(): void {
  }

}
