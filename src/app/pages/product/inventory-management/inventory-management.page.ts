import { Product } from 'src/app/pages/product/product';
import { Inventory } from './../inventory';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.page.html',
  styleUrls: ['./inventory-management.page.scss'],
})
export class InventoryManagementPage implements OnInit {
  productID: number;
  inventory: Inventory = {
    type: 'in-stock',
    amount: null,
    remarks:''
  };
  product : Product;
  constructor(
    private activatedRoute: ActivatedRoute,

  ) {
    this.productID = this.activatedRoute.snapshot.params['productID']
    console.log('productID =',this.productID)

  }

  ngOnInit() {
    
  }
  segmentChanged(event: { detail: { value: string; }; }) {
    this.inventory.type = event.detail.value;
    console.log('this.inventory.type = ',this.inventory.type)
  }
}
