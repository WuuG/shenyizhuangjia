import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  productID: number;

  constructor(
    private activatedRoute:ActivatedRoute,
  ) {
    this.productID = this.activatedRoute.snapshot.params['productID']
    console.log('productID = ',this.productID);
    
  }

  ngOnInit() {
  }

}
