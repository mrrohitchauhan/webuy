import { CommonUtilsService } from './../../../utils/common-utils.service';
import { ProductsService } from './../../../services/products.service';
import { GlobalService } from './../../../services/global.service';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
})
export class QueriesComponent implements OnInit {
  queries = [];
  constructor(
    private globalService: GlobalService,
    private ngZone: NgZone,
    private productservice: ProductsService,
    private commonUtils: CommonUtilsService
  ) {}

  ngOnInit(): void {
    this.globalService.query.subscribe((res) => {
      this.ngZone.run(() => {
        this.queries = res;
      });
    });
  }
  changeStatus(queryId) {
    this.productservice
      .updateQueries(queryId)
      .then((res) => {
        this.commonUtils.showNotification(2, 'Status Changed.');
      })
      .catch((e) => {
        this.commonUtils.showNotification(4, e.message);
      });
  }
}
