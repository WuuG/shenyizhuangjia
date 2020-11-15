import { AlertController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/pages/product/product';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { ProductPageResult } from 'src/app/shared/interfaces/product-page-result';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private localStorageService: LocalStorageService,
    private alertController:AlertController,
    private toastController:ToastController,
  ) { }
  async alert(message: string,buttons: [string]) {
    let alert = await this.alertController.create({
      message,
      buttons:['确定'],
    })
    alert.present();
  }
  async toast(message: string) {
   let toastMs = await this.toastController.create({
    message,
    duration:2000,
   }) 
    toastMs.present();
  }
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
  async getList(index: number, size: number): Promise<AjaxResult> {
    let list = new AjaxResult(false,'null',{message: 'error',details:''})
    if (index < 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    list.success = true;
    let Allproduct: Array<Product> = this.localStorageService.get('product',[]);
    console.log(Allproduct);
    let products = Allproduct.slice(0 ,(index * size -1))
    const productPageResult: ProductPageResult = {
      totalCount: Allproduct.length,
      products,
    }
    list.result = productPageResult;
    return list;
  }
  getProductById(productID: number): Product {
    let product: Product;
    let products = this.localStorageService.get('product',[]);
    for(let i = 0;i < products.length; i++) {
      // console.log(products[i].id,productID,i,"是否相等",productID);
      if(products[i].id == productID) {
        console.log(products[i].id,"是否相等",productID);
        product = products[i];
      }
    }
    if(!product) {
      this.alert('无法找到这个产品',['确定'])
    }
    // console.log('product:',product);
    return product;
  }
  editProduct(ID: number, newProduct: Product) {
    let products = this.localStorageService.get('product',[]);
    console.log('编辑商品中 product =',products[ID])
    products[ID] = newProduct;
    this.localStorageService.set('product',products);
    console.log('商品改动成功 product =',products[ID])
  }
}
