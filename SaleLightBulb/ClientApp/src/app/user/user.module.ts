import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from '../base/base.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AuthAdminGuard } from '../base/services/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: ':id',
    component: UserDetailComponent,
    canActivate: [AuthAdminGuard],
  },
];

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [CommonModule, BaseModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModule {}
