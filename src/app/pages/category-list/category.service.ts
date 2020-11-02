import { Category } from './../../shared/category';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { CATEGORIES } from 'src/app/shared/mock.categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  activeCategory: any;
  categories: Category[]
  constructor(private localStorageService: LocalStorageService) {
    this.activeCategory = { id: 5, name: '默认类别' };
    this.getAll()
  }
  async getAll(): Promise<AjaxResult> {
    this.categories = this.localStorageService.get('Category', CATEGORIES);
    return {
      targetUrl: '',
      result: this.categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }

  async getById(id: number): Promise<Category> {

    await this.getAll()
    console.log(this.categories)
    return this.categories.find(c => {console.log(c.id,id,c.id===id);return c.id === id})

  }
  addCategory(category: Category) {
    if (!this.isUnique(category)) {
      console.log("商品分类重复了 ")
      return false;
    }
    this.getAll().then((data) => {
      let categories = data.result;
      category.id = categories.length + 1;
      categories.push(category);
      this.localStorageService.set('Category', categories);
    });
    return true;
  }
  async addSubCategory(categoryNew: Category): Promise<AjaxResult> {
    const err = {
      targetUrl: '',
      result: '',
      success: false,
      error: null,
      unAuthorizedRequest: false
    };
    if (!this.isUnique(categoryNew)) {
      return err
    }
    const data = await this.get(categoryNew.id);
    if (!data.success) {
      console.log("Not Found!")
      return err
    }
    // cat in storage
    const catOld = data.result;

    let maxId = categoryNew.id * 100 + 1;
    // for (const c of catOld.children) {
    //   if (c.id > maxId) {
    //     maxId = c.id;
    //   }
    // }
    for (const c of categoryNew.children) {
      c.id = maxId;
      maxId++
      // catOld.children.push(c);
    }
    // if (!this.isUnique(categoryNew)) {
    //   return err
    // }
    this.update(categoryNew);
    return {
      targetUrl: '',
      result: '',
      success: true,
      error: null,
      unAuthorizedRequest: false
    };

  }
  async get(id: number): Promise<AjaxResult> {
    const cat = this.localStorageService.get('Category', CATEGORIES);
    for (const c of cat) {
      if (id === c.id) {
        return {
          targetUrl: '',
          result: c,
          success: true,
          error: null,
          unAuthorizedRequest: false
        };
      }
    }
    return {
      targetUrl: '',
      result: '',
      success: false,
      error: null,
      unAuthorizedRequest: false
    };
  }
  update(category: Category): boolean {
    const cat = this.localStorageService.get('Category', CATEGORIES);
    for (const c of cat) {
      if (category.id === c.id) {
        c.name = category.name;
        c.children = category.children;
        this.localStorageService.set('Category', cat);
        return true;
      }
    }
    return false;
  }

  isUnique(category: Category): boolean {
    const hash = {}
    for (const cat of category.children) {
      console.log("判断是否存在")
      if (hash[cat.name] === 1) {
        return false
      }
      hash[cat.name] = 1
    }
    return true;
  }
}
