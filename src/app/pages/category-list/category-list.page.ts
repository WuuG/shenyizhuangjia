import { Category } from './../../shared/category';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories: Array<Category>;
  activeCategory: Category;
  activeSubCategories: Category;

  constructor(private categoryService: CategoryService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
  ) {
    categoryService.getAll().then(data => {
      this.categories = data.result;
      if (this.categories) {
        this.activeCategory = this.categories[0];
      }
    });
  }

  ionViewWillEnter() {
    this.categoryService.getAll().then((data) => {
        this.categories = data.result;
        if (this.categories) {
            this.activeCategory = this.categories[0];
        }
    });
}
  ngOnInit() {
  }
  onSelectCategory(id: number) {
    this.activeCategory = this.categories[id - 1];
  }
  onSelectSubCategory(id: number) {
    this.activeSubCategories = this.activeCategory.children[id % 10 - 1];
  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.gotoAddCategory();
          }
        }, {
          text: '编辑分类',
          handler: () => {
            console.log('Archive clicked');
            this.gotoEditCategory();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  gotoAddCategory(isMain = false) {
    if (isMain){
      this.router.navigate(['/category/add'])

    }else{
      this.router.navigate(['/category/add'],
      { queryParams: { id: this.activeCategory.id, name: this.activeCategory.name } });
    }
 
  }
  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }
  getItemClass(id: number): string {
    if (id === this.activeCategory.id) {
      return 'item-active';
    }
    return '';
  }
  gotoEditCategory() {
    this.router.navigate(['/category/edit'], {queryParams: {'categoryId': this.activeCategory.id}});
  }
}
