import { ProductService } from './../product.service';
import { Product } from './../product';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss'],
})
export class ProductEditModalComponent implements OnInit {
  @Input()
  passProduct: Product;

  constructor(
    private modalController:ModalController,
    private productService: ProductService,
  ) { }

  ngOnInit() {}
  onshare(message: string) {
    
    this.productService.toast(`已复制商品信息，可以到${message}中分享给别人啦`);
    this.onback();
  }
  onback() {
    this.modalController.dismiss();
  }
}
