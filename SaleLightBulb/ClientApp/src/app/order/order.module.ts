import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from '../base/base.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AuthGuardService } from '../base/services/auth-guard.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':id',
    component: OrderDetailComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    ContactInformationComponent
  ],
  imports: [CommonModule, BaseModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderModule { }
