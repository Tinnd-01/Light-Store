import { RouteConstant } from 'src/app/base/constants';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BaseModule } from '../base/base.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthAnonymostGuardService } from '../base/services/auth-anonymost-guard.service';
import { LogoutGuard } from './services/logout.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from '../base/services/auth-guard.service';

const routes: Routes = [
  {
    path: RouteConstant.SIGN_UP,
    component: SignUpComponent,
    canActivate: [AuthAnonymostGuardService],
  },
  {
    path: RouteConstant.SIGN_IN,
    component: SignInComponent,
    canActivate: [AuthAnonymostGuardService],
  },
  {
    path: RouteConstant.SIGN_OUT,
    component: SignInComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: RouteConstant.ACCOUNT,
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ProfileComponent],
  imports: [CommonModule, BaseModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModule {}
