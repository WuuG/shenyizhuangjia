import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProductService } from './../product.service';
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
    private productService: ProductService,
    private localStorageService: LocalStorageService,
  ) {
    this.productID = this.activatedRoute.snapshot.params['productID']
    console.log('productID =',this.productID)

  }

  ngOnInit() {
   this.getpeoduct()
  }
  getpeoduct(){
    this.product = this.productService.getProductById(this.productID);
    // console.log(this.product);
    }
  segmentChanged(event: { detail: { value: string; }; }) {
    this.inventory.type = event.detail.value;
    console.log('this.inventory.type = ',this.inventory.type)
  }
  onsubmitStockInfo(){
    if(this.inventory.type == 'out-stock' && this.inventory.amount > this.product.inventory ) {
      this.productService.alert('库存数量不足，无法出库',['确定'])
      return
    }
    if(this.inventory.type == 'out-stock') {
      this.product.inventory = this.product.inventory - this.inventory.amount;
      this.productService.editProduct(this.productID,this.product);
      this.productService.toast('商品出库成功');
      this.inventoryRecord();
    } else {
      this.product.inventory = this.product.inventory + this.inventory.amount;
      this.productService.editProduct(this.productID,this.product);
      this.productService.toast('商品入库成功');
      this.inventoryRecord();
    }
  }
  inventoryRecord(){
    let id:number;
    let Records: Array<Inventory>;
    Records = this.localStorageService.get('inventory-record',[]);
    Records.push(this.inventory);
    this.localStorageService.set('inventory-record',Records);
  }
}
