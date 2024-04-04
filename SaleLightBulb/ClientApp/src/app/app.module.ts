import { ShellComponent } from './shell/components/shell/shell.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BaseModule } from './base/base.module';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { RouteConstant } from './base/constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpStatusInterceptor } from './base/services/http-status.interceptor';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageNotFindComponent } from './base/components/page-not-find/page-not-find.component';

const routes: Routes = [
  {
    path: RouteConstant.HOME,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RouteConstant.PRODUCT,
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: RouteConstant.CATEGORY,
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: RouteConstant.ORDER,
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: RouteConstant.CART,
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: RouteConstant.USER,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: RouteConstant.PAGE_NOT_FOUND,
    component: PageNotFindComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BaseModule.forRoot(),
    HomeModule,
    ShellModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpStatusInterceptor,
      multi: true,
    },
  ],
  bootstrap: [ShellComponent],
})
export class AppModule {}
