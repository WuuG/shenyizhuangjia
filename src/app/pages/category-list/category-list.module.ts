import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CategoryListPageRoutingModule } from './category-list-routing.module';

import { CategoryListPage } from './category-list.page';
import { CategoryAddPage } from './category-add/category-add.page';
import { CategoryNameEditPage } from './category-name-edit/category-name-edit.page';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    SharedModule,
    CategoryListPageRoutingModule
  ],
  declarations: [
    CategoryListPage,
    CategoryAddPage,
    CategoryListPage,
    CategoryNameEditPage
  ]
})
export class CategoryListPageModule {}
