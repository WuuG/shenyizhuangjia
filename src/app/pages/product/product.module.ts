import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ProductPageRoutingModule } from './product-routing.module';
import { ProductListPage } from './product-list/product-list.page';
import { ProductAddPage } from './product-add/product-add.page';

@NgModule({
  imports: [
    SharedModule,
    ProductPageRoutingModule
  ],
  declarations: [
    ProductListPage,
    ProductAddPage,
  ]
})
export class ProductPageModule {}
