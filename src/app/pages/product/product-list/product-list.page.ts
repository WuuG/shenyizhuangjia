import { ProductService } from './../product.service';
import { Router } from '@angular/router';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ProductPageResult } from 'src/app/shared/interfaces/product-page-result';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  private currentIndex: number;
  products: Product[];
  total: number;
  queryTerm: string;
  categoryId: number;
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private productService: ProductService,
    private alertController:AlertController,
  ) { }

  async ngOnInit() {
    this.onInitproduct();
    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    this.refreshList();
    this.loadingController.dismiss();
  }
  onInitproduct() {
    this.currentIndex = 1,
    this.total = 0,
    this.queryTerm = '';
    this.categoryId = -1;
  }
  async refreshList() {
    try {
      const result = await this.productService.getList(this.currentIndex, 10);
      const list: ProductPageResult = await (await this.productService.getList(this.currentIndex, 10)).result;
      this.total = list.totalCount;
      this.products = list.products;
      console.log(this.products);
    } catch (error) {
      console.log(error);
      // 实际开发中应记录在日志文件中
    }
  }
  gotoCatogory() {
    this.router.navigateByUrl('/category')
  }
  onRefresh(event) {
    this.products = [];
    this.currentIndex = 1;
    console.log('Begin async operation');
    setTimeout(() => {  
      console.log('Async operation has ended');
      event.target.complete();
      this.refreshList();
    }, 2000);
  }
  onInfinite(event) {
    setTimeout(async () => {
      console.log('Done');
      this.currentIndex++;
      this.refreshList();
      const maxcount = (this.currentIndex - 1) * 10;
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (maxcount >= this.total) {
        const alert = await this.alertController.create({
          message: '已经没有商品了，请刷新',
          buttons:['确定']
        })
        alert.present();
      }
    }, 1500);
  }

}
