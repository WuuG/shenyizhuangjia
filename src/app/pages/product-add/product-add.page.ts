import { ActiveCategory } from './../../shared/active-category';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { CategoryService } from './../category-list/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit, OnDestroy {
  product: Product
  subscription: Subscription;
  activeCategory: ActiveCategory = {id: 0, name: '默认分类'};
  constructor(
    private categoryService: CategoryService,
    private ActionSheetController: ActionSheetController,
    private productService: ProductService,
    private AlertController: AlertController,
    private router: Router,
    ) {
    this.initProduct();
    this.subscription = categoryService.watchCategory().subscribe(
      (activeCategory) => {
        this.activeCategory = activeCategory;
        this.product.categoryId = activeCategory.id;
        this.product.categoryName = activeCategory.name;
      },
      (error) => {
      }
    );
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }
  private initProduct(): void {
    this.product = {
      id: 0,
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '',
      images: [],
      price: null,
      purchasePrice: null, 
      inventory: null, 
      standard: '', 
      remarks: ''
    };
  }
  async showActiveSheet() {
    const acsheet = await this.ActionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('camera');

          }
        }, {
            text: '相册',
              handler: () => {
              console.log('album');

          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });
    await acsheet.present();
  }
  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.AlertController.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.initProduct();
          this.product.categoryName = '默认分类';
        } else {
          this.router.navigateByUrl('/productList');
        }
      } else {
        const alert = await this.AlertController.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }
  gotoCategyList() {
    this.router.navigate(['/category'], {
      queryParams: {
        From : 'ProductAdd'
      }
    });
    // this.router.navigateByUrl('/category-list');
  }
}
