import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Product } from './../../product/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { Category } from 'src/app/shared/category';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {
  private categoryId: any;
  private category: Category;
  private tab: number;

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private toastCtrl: ToastController,
    private localStorageService: LocalStorageService,
  ) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.categoryId = queryParams.categoryId;
      this.category = this.categoryService.findCategoryById(this.categoryId);
    });
  }

  ngOnInit() {
  }
  private async presentModal(name: string) {
    const modal = await this.modalController.create({
      component: CategoryNameEditPage,
      componentProps: { value: name }
    });
    await modal.present();
    return modal.onWillDismiss();
  }
  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    console.log(this.category);
    const { data } = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
      // this.categoryService.changed.next(true);
    }
  }
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const { data } = await this.presentModal(subCategory.name);
    this.tab = 0;
    for (let i = 0; i < this.category.children.length; i++) {
      if (data === this.category.children[i].name || data === '') {
        // console.log('名字重复');
        const toast = await this.toastCtrl.create({
          message: '编辑失败，存在相同名称或者名称不能为空',
          duration: 3000
        });
        toast.present();
        this.tab = 1;
        break;
      }
    }
    if (this.tab === 0) {
      subCategory.name = data;
    }
  }
  async onDelete(item: IonItemSliding, subId?: number) {
    let isDelete = this.isDelete(subId);
    const alert = await this.alertController.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            if (isDelete) {
              if (subId != null) {
                item.close();
                this.categoryService.deleteSubCategoryById(this.category, subId);
                this.category = this.categoryService.findCategoryById(this.categoryId);
                this.toast('分类删除成功')
              } else if (this.category.children.length === 0) {
                item.close();
                this.categoryService.deleteCategoryById(this.category.id);
                this.router.navigateByUrl('/category');
                this.toast('分类删除成功')
              } else {
                item.close();
                this.alert('请先删除小分类', ['取消'])
              }
            } else {
              this.alert('此分类下有商品', ['取消'])
            }
          }
        }
      ]
    });

    await alert.present();
  }
  isDelete(subId?: number) {
    let Product = this.localStorageService.get('product', []);
    if (Product === undefined) {
      return true;
    }
    for (let i = 0; i < Product.length; i++) {
      if (Product[i].categoryId === subId) {
        return false;
      }
    }
    return true;
  }
  ionViewDidLeave() {
    if (this.categoryService.modifyCategory(this.category)) {
      console.log('保存成功');
    } else {
      console.log('保存失败');
    }
  }

  async alert(message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      message,
      buttons
    })
    alert.present()
  }
  async toast(message: string) {
    const alert = await this.toastCtrl.create({
      message,
      duration: 2000,
    })
    alert.present()
  }
}
