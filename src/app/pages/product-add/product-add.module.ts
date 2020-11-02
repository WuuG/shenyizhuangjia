import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ProductAddPageRoutingModule } from './product-add-routing.module';

import { ProductAddPage } from './product-add.page';

@NgModule({
  imports: [
    SharedModule,
    ProductAddPageRoutingModule
  ],
  declarations: [ProductAddPage]
})
export class ProductAddPageModule {}
