import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      $('#main-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400,
      });

      $('.product-slider').owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        responsive: {
          480: {
            items: 1,
          },
          765: {
            items: 2,
          },
          991: {
            items: 3,
          },
          1200: {
            items: 5,
          },
        },
      });
      $('#get-inspired').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400,
      });
    }, 10);
  }
}
