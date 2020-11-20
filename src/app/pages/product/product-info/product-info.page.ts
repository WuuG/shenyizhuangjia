import { ProductService } from './../product.service';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Product } from './../product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ProductEditPopoverComponent } from '../product-edit-popover/product-edit-popover.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {
  product: Product;
  productID:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private popoverController: PopoverController,
    private modalController:ModalController,

  ) {
    this.productID = this.activatedRoute.snapshot.params['productID']
    // console.log('productID:',this.productID)
    this.getProductInfo(this.productID);
  }

  ngOnInit() {
  }
  getProductInfo(productID: number) {
    // console.log('productID:',productID)
    let productTemp = this.productService.getProductById(productID);
    this.product = productTemp;
    console.log('product(pageinfo)',this.product);
  }
  async onEditProduct(ev: any) {
    const popover = await this.popoverController.create({
      component: ProductEditPopoverComponent,
      cssClass: 'edit-top-popover',
      event: ev,
      translucent: false,
      componentProps: {
        passProduct: this.product,
        passID: this.productID,
      }
    });
  
    await popover.present();
  }
  async onshareModal() {
    const modal = await this.modalController.create({
      component: ProductEditModalComponent,
      cssClass: 'edit-modal',
      componentProps: {
        passProduct: this.product,
      }
    })
    return await modal.present();
  }
}
