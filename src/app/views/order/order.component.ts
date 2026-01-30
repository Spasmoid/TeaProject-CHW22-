import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Subscription, tap} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductHttpService} from "../../shared/services/product-http.service";
import {OrderDataType} from "../../../types/order-data.type";
import {SearchService} from "../../shared/services/search.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  orderForm = this.fb.group({
    product: [''],
    name: ['', [Validators.required, Validators.pattern('^[А-Яа-я]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[А-Яа-я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{1,11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[А-Яа-я]+$')]],
    zip: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 -]{3,10}$')]],
    address: ['', [Validators.required, Validators.pattern('^[А-ЯёЁа-я0-9 \\/-]+$')]],
    comment: [''],
  });
  private subscription: Subscription | null = null;
  private orderSubscription: Subscription | null = null;
  public orderCreated: boolean = false;
  public invalidFormSubmitted: boolean = false;
  public orderError: boolean = false;
  public isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private productHttpService: ProductHttpService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(param => {
      if (param['product']) {
        this.orderForm.patchValue({
          product: param['product'],
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

  createOrder(): void {
    if (this.orderForm.invalid) {
      this.invalidFormSubmitted = true;
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const data: OrderDataType = {
      name: this.orderForm.get('name')?.value as string,
      last_name: this.orderForm.get('lastName')?.value as string,
      phone: Number(this.orderForm.get('phone')?.value) as number,
      country: this.orderForm.get('country')?.value as string,
      zip: this.orderForm.get('zip')?.value as string,
      product: this.orderForm.get('product')?.value as string,
      address: this.orderForm.get('address')?.value as string,
      comment: this.orderForm.get('comment')?.value as string,
    }
    this.orderSubscription = this.productHttpService.createOrder(data)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
      next: (data) => {
        if (data.success) {
          this.orderCreated = true;
          this.invalidFormSubmitted = false;
          this.orderError = false;
        } else {
          this.orderError = true;
          setTimeout(() => {
            this.orderError = false;
          }, 3000);
        }
        },
      error: (error) => {this.orderCreated = false;},
    });
  }
}
