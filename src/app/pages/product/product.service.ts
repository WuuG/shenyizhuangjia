import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private localStorageService: LocalStorageService,
  ) { }
  async insert(input: Product): Promise<AjaxResult> {
    const tempproduct = this.localStorageService.get('product', []);
    input.id = this.autoIncrement(tempproduct);
    tempproduct.push(input);
    this.localStorageService.set('product', tempproduct);
    return {
      targetUrl: '',
      result: tempproduct,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  autoIncrement(Product: Product[]): number {
    const length = Product.length;
    if (length === 0) {
      return 1;
    } else {
      return Product[length - 1].id + 1;
    }
  }
}
