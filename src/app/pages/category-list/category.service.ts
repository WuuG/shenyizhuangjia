import { Category } from 'src/app/shared/category';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { CATEGORIES } from 'src/app/shared/mock.categories';
import { Observable, Subject } from 'rxjs';
import { ActiveCategory } from 'src/app/shared/active-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  activeCategory: any;
  categories: Category[]
  categorySubject = new Subject<ActiveCategory>();
  private changed = new Subject<boolean>();
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

  watchChange() { return this.changed.asObservable(); }

  async getById(id: number): Promise<Category> {

    await this.getAll()
    console.log(this.categories)
    return this.categories.find(c => { console.log(c.id, id, c.id === id); return c.id === id })

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
      console.log("id=", category.id);
      if (category.id === c.id) {
        console.log("update")
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
  findCategoryById(id: string): Category {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    console.log("find所有的商品類別=", cg)
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].id.toString() === id) {
        return cg[i];
      }
    }
    const category: Category = {
      id: -1,
      name: '',
      children: []
    };
    return category;
  }
  deleteCategoryById(id: number): boolean {
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === id) {
        tmp.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }
  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id === id) {
        const index = this.findCategoryIndexByName(category.name);
        let tmp = this.localStorageService.get('Category', CATEGORIES);
        tmp[index].children.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }
  modifyCategory(category: Category): boolean {
    const index = this.findCategoryIndexById(category.id);
    if (index === -1) {
      return false;
    }
    let tmp = this.localStorageService.get('Category', CATEGORIES);
    tmp[index] = category;
    this.localStorageService.set('Category', tmp);
    this.changed.next(true);
    return true;
  }

  findCategoryIndexById(id: number) {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  findCategoryIndexByName(name: string): number {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].name === name) {
        return i;
      }
    }
    return -1;
  }
  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }

}
