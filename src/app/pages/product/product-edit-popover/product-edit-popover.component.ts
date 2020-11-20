import { PopoverController, AlertController } from '@ionic/angular';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/pages/product/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit-popover',
  templateUrl: './product-edit-popover.component.html',
  styleUrls: ['./product-edit-popover.component.scss'],
})
export class ProductEditPopoverComponent implements OnInit {

  @Input()
  passProduct: Product
  @Input()
  passID: number
  constructor(
    private router: Router,
    private productService: ProductService,
    private popoverController: PopoverController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    console.log('passProduct=', this.passProduct, 'passID =', this.passID);

  }
  gotoproductedit() {
    this.popoverController.dismiss();
    console.log('passID',this.passID);
    
    this.router.navigate(['/product/edit', this.passID]);
  }
  async DelProduct() {
    this.popoverController.dismiss();
    let alert = await this.alertController.create({
      message: '将该商品删除？',
      buttons: [
        {
          text: '确定',
          handler:() => {
            this.productService.DelProduct(this.passID);
            this.productService.toast('删除商品成功')
            this.router.navigate(['/product/list'])
          }
        },
        {text:'取消', role:'cancel'}
      ]
    })
    alert.present();
  }
}
