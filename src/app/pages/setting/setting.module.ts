import { ShopEditPage } from './shop/shop-edit/shop-edit.page';
import { ShopPage } from './shop/shop.page';
import { ChangePasswordPage } from './change-password/change-password.page';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    SettingPageRoutingModule,
    SharedModule
  ],
  declarations: [SettingPage, ChangePasswordPage, ShopPage, ShopEditPage]
})
export class SettingPageModule { }
