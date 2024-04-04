import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BaseModule } from '../base/base.module';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuardService } from '../base/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule, BaseModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CartModule { }
