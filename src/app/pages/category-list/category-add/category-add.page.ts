import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {
  id: number;
  name: string;
  children: Array<Category> = [];
  category: Category = {
    id: 0,
    name: '',
    children: []
  };
  idnumber = 1;
  constructor(
    private menuController: MenuController,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.menuController.enable(false);
    this.activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams);
      this.id = 0
      if (queryParams.id){
        this.id = parseInt(queryParams.id);
      }
      this.name = queryParams.name;
      console.log('id=', this.id);
      console.log('name=', this.name);

    });
    const newchildren: Category = {
      id: this.idnumber++,
      name: '',
      children: []
    };
    this.children.push(newchildren);
  }

  async ngOnInit() {
    if (this.id) {
      this.category = await this.categoryService.getById(this.id)
      console.log(this.category)
      this.children = this.category.children
    }
  }
  onAddSubCategory() {
    const newchildren: Category = {
      id: this.idnumber++,
      name: '',
      children: [],
    };
    this.children.push(newchildren);
  }
  onsave() {
    if (this.id === 0) {
      // 新建分类
      this.onSaveAddCategory();
    }
    else {
      // 更新已有分类
      this.onSaveAddSubCatory();
    }
  }
  async onSaveAddCategory() {
    this.category.children = this.children;
    const success = this.categoryService.addCategory(this.category)
    console.log(success)
    if (success) {
      const alert = await this.alertController.create({
        header: '提示',
        message: '新增成功',
        buttons: ['确定']
      });
      alert.present();
      this.router.navigateByUrl('category');
    } else {
      const alert = await this.alertController.create({
        message: '商品类别不可重复',
        buttons: ['取消'],
      });
      alert.present();
    }
  }
  async onSaveAddSubCatory() {
    this.category.children = this.children;
    this.category.id = this.id;
    const data = await this.categoryService.addSubCategory(this.category);
    if (data.success) {
      const alert = await this.alertController.create({
        header: '提示',
        message: '新增成功',
        buttons: ['确定'],
      });
      alert.present();
      this.router.navigateByUrl('category');
    } else {
      const alert = await this.alertController.create({
        message: '商品类别不能重复',
        buttons: ['确定'],
      });
      alert.present();
    }
  }
}
