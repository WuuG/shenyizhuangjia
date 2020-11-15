import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryManagementPage } from './inventory-management/inventory-management.page';
import { ProductAddPage } from './product-add/product-add.page';
import { ProductInfoPage } from './product-info/product-info.page';
import { ProductListPage } from './product-list/product-list.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ProductListPage
  },
  {
    path: 'add',
    component: ProductAddPage
  },
  {
    path: 'info/:productID',
    component: ProductInfoPage
  },
  {
    path: 'inventory/:productID',
    component: InventoryManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
