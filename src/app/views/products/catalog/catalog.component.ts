import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductHttpService} from "../../../shared/services/product-http.service";
import {Router} from "@angular/router";
import {catchError, distinctUntilChanged, map, of, Subscription, switchMap, tap} from "rxjs";
import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];
  subscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;
  public searchParam: string = '';

  constructor(private httpService: ProductHttpService, private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.subscription = this.searchService.search$.pipe(
      map(param => param.trim()),
      distinctUntilChanged(),
      tap(param => this.searchParam = param),
      switchMap(param =>
        this.httpService.getProducts(param).pipe(
          catchError(() => {
            this.router.navigate(['/']);
            return of([]);
          })
        )
      )
    ).subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }
}
