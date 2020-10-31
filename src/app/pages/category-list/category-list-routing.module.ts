import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryAddPage } from './category-add/category-add.page';
import { CategoryEditPage } from './category-edit/category-edit.page';

import { CategoryListPage } from './category-list.page';
import { CategoryNameEditPage } from './category-name-edit/category-name-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryListPage
  },
  {
    path: 'add',
    component: CategoryAddPage
  },
  {
    path: 'edit',
    component: CategoryEditPage
  },
  {
    path: 'name-edit',
    component: CategoryNameEditPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryListPageRoutingModule {}
