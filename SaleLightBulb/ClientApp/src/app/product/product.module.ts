import { AuthGuardService } from './../base/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditerComponent } from './components/product-editer/product-editer.component';
import { RouteConstant } from '../base/constants';
import { UploadAreaComponent } from './components/upload-area/upload-area.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AuthAdminGuard } from '../base/services/auth-admin.guard';
import { SearchProductComponent } from './components/search-product/search-product.component';

const routes: Routes = [
  {
    path: `${RouteConstant.SEARCH}/:search`,
    component: SearchProductComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  },
  {
    path: `${RouteConstant.EDIT_PRODUCT}/:id`,
    component: ProductEditerComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: RouteConstant.ADD_PRODUCT,
    component: ProductEditerComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: RouteConstant.WISH_LIST,
    component: WishListComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductEditerComponent,
    UploadAreaComponent,
    WishListComponent,
    SearchProductComponent,
  ],
  imports: [CommonModule, BaseModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductModule {}
