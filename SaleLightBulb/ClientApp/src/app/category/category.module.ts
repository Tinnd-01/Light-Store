import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from '../base/base.module';
import { ProductOfCategoryComponent } from './components/product-of-category/product-of-category.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductOfCategoryComponent,
  }
];

@NgModule({
  declarations: [
    ProductOfCategoryComponent
  ],
  imports: [CommonModule, BaseModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryModule {}
