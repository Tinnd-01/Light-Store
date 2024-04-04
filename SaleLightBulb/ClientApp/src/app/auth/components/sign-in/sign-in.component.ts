import { ToastService } from './../../../base/services/toast.service';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiProxy } from 'src/app/api/services/auth.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends BaseComponent {
  constructor(
    private router: Router,
    private authService: AuthApiProxy,
    private authenResolver: AuthResolverService,
    private toastService: ToastService
  ) {
    super();
  }

  public readonly controls = {
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  };
  public form: FormGroup = new FormGroup(this.controls);

  goToSignUpPage() {
    this.router.navigate([RouteConstant.SIGN_UP]);
  }

  signIn() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value).subscribe(
      (auth) => {
        this.authenResolver.setAuthData(auth);
        this.router.navigate([RouteConstant.HOME]);
        this.toastService.showSuccess('Đăng nhập thành công');
      },
      () => {
        this.toastService.showError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    );
  }
}
