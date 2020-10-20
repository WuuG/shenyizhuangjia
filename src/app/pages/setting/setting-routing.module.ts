import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';
import { ShopEditPage } from './shop/shop-edit/shop-edit.page';
import { ShopPage } from './shop/shop.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  },
  {
    path: 'shop',
    component: ShopPage,
  },
  {
    path: 'shop',
    component: ShopEditPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
