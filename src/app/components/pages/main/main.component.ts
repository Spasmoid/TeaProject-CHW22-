import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {

  public isPopupOpen: boolean = false;
  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable<boolean>((observer) => {
      const timeout = setTimeout(() => {
        observer.next(true);
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });
  }

  ngOnInit() {
    this.subscription = this.observable.subscribe((param: boolean) => {this.isPopupOpen = param});
  }

  ngAfterViewInit() {
    $('.slider').slick({
      autoplay: true,
      infinite: true
    });

    $('.slick-next').html("<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<g clip-path=\"url(#clip0_3910_132)\">\n" +
      "<path d=\"M15.6795 10.5226L7.21806 19.8232C7.02237 20.0385 6.75377 20.1645 6.46185 20.1781C6.16994 20.1916 5.89099 20.091 5.67651 19.8947L4.99363 19.2705C4.54925 18.8638 4.51762 18.1707 4.9231 17.7251L12.0284 9.91505L4.23305 2.78805C4.01857 2.5918 3.89282 2.32276 3.87947 2.03028C3.8661 1.73747 3.96682 1.45792 4.16251 1.24248L4.78565 0.557867C4.9815 0.342583 5.24994 0.216532 5.54186 0.202987C5.83377 0.189442 6.11272 0.290095 6.3272 0.48634L15.6087 8.97182C15.8237 9.16869 15.9492 9.43905 15.9619 9.73205C15.976 10.0261 15.8757 10.3068 15.6795 10.5226Z\" fill=\"#076BFF\"/>\n" +
      "</g>\n" +
      "<defs>\n" +
      "<clipPath id=\"clip0_3910_132\">\n" +
      "<rect width=\"19.9396\" height=\"20\" fill=\"white\" transform=\"matrix(1 0 2.22607e-08 -1 0.138916 20)\"/>\n" +
      "</clipPath>\n" +
      "</defs>\n" +
      "</svg>\n");

    $('.slick-prev').html("<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<g clip-path=\"url(#clip0_3910_126)\">\n" +
      "<path d=\"M5.32935 9.47742L13.7908 0.176819C13.9865 -0.0384587 14.2551 -0.164517 14.547 -0.178062C14.8389 -0.191607 15.1179 -0.0909537 15.3323 0.105292L16.0152 0.729469C16.4596 1.13622 16.4912 1.82934 16.0858 2.27487L8.98048 10.085L16.7758 17.212C16.9903 17.4082 17.116 17.6772 17.1294 17.9697C17.1427 18.2625 17.042 18.5421 16.8463 18.7575L16.2232 19.4421C16.0273 19.6574 15.7589 19.7835 15.467 19.797C15.1751 19.8106 14.8961 19.7099 14.6817 19.5137L5.40013 11.0282C5.18513 10.8313 5.05964 10.561 5.04692 10.268C5.03285 9.97387 5.13319 9.6932 5.32935 9.47742Z\" fill=\"#076BFF\"/>\n" +
      "</g>\n" +
      "<defs>\n" +
      "<clipPath id=\"clip0_3910_126\">\n" +
      "<rect width=\"19.9396\" height=\"20\" fill=\"white\" transform=\"matrix(-1 0 -2.22607e-08 1 20.87 0)\"/>\n" +
      "</clipPath>\n" +
      "</defs>\n" +
      "</svg>\n");

    $( function() {
      $( "#accordion" ).accordion();
    } );
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
