import { Router } from '@angular/router';
import { CategoryService } from './category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/category';
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

  constructor(private categoryService: CategoryService, private actionSheetCtrl: ActionSheetController) {
    categoryService.getAll().then(data => {
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
          }
        },{
          text: '编辑分类',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
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
  gotoAddCategory() {
    // Router
  }
  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }
  getItemClass(id: number): boolean {
    if (id === this.activeCategory.id) {
      return true;
    }
    return false;
  }
}
