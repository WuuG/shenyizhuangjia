import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ActiveCategory } from 'src/app/shared/active-category';
import { CategoryService } from '../../category-list/category.service';
import { ProductService } from '../product.service';
import { ImagePickerOptions,OutputType } from '@ionic-native/image-picker';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit, OnDestroy {
  product: Product
  subscription: Subscription;
  activeCategory: ActiveCategory = { id: 0, name: '默认分类' };
  private cameraOptions: CameraOptions= {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG, 
    mediaType: this.camera.MediaType.PICTURE,
  };
  private imagePickerOption : ImagePickerOptions = {
    maximumImagesCount: 3,
    quality: 80,
    outputType:OutputType.DATA_URL,
    
  }
  constructor(
    private categoryService: CategoryService,
    private ActionSheetController: ActionSheetController,
    private productService: ProductService,
    private AlertController: AlertController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private imagePicker: ImagePicker,
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
      categoryId: 5,
      categoryName: '默认类别',
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
            console.log('photo');
            this.onPhoto();
          }
        }, {
          text: '相册',
          handler: () => {
            console.log('album');
            this.onAlnum();
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
  onAlnum() {
    this.imagePicker.getPictures(this.imagePickerOption).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          const base64Image = 'data:image/jpeg;base64,' + results[i];
          this.product.images.push(base64Image);
      }
    }, (err) => {
      console.log('ERROR:' + err);
      this.alerterr('提示', err, ['确定'])
    });
  }
  onPhoto() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      console.log('ERROR:' + err);
      this.alerterr('提示', err, ['确定'])
    });
  }
  async onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.product.barcode = barcodeData.text;
    }).catch(async err => {
      console.log('Error', err);
      this.alerterr('提示', err, ['确定'])
    });
  }
  async onSave(ct: boolean = false) {
    if(!this.product.inventory) {
      this.product.inventory = 0;
    }
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        this.productService.toast('商品添加成功');
        if (ct) {
          this.initProduct();
          this.product.categoryName = '默认分类';
        } else {
          this.router.navigateByUrl('/product/list');
        }
      } else {
        this.alerterr('提示', '添加失败', ['确定'])
      }
    });
  }
  selectCategory() {
    // this.router.navigate(['/category'], {
    //   queryParams: {
    //     From: 'ProductAdd'
    //   }
    // });
    this.router.navigateByUrl('/category');
  }
  async alerterr(header: string, message: string, buttons: string[]) {
    const alert = await this.AlertController.create({
      header,
      message,
      buttons
    })
    alert.present();
  }
}
