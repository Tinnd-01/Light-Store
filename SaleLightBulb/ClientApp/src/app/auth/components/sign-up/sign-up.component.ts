import { ToastService } from './../../../base/services/toast.service';
import { AuthApiProxy } from './../../../api/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { Utils } from 'src/app/base/helper/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends BaseComponent {
  constructor(
    private router: Router,
    private authService: AuthApiProxy,
    private toastService: ToastService
  ) {
    super();
  }

  public readonly controls = {
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    address: new FormGroup({
      city: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      addressDetail: new FormControl(null, [Validators.required]),
    }),
  };
  public form: FormGroup = new FormGroup(this.controls);

  *onSubscribe() {
    yield this.controls.phoneNumber.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.controls.phoneNumber.setValue(
          Utils.removeNotDigitCharacters(val ?? '') ?? ''
        );
      });
  }

  goToSignInPage() {
    this.router.navigate([RouteConstant.SIGN_IN]);
  }

  signUp() {
    if (this.form.valid) {
      this.authService.signUp(this.form.value).subscribe(
        () => {
          this.goToSignInPage();
          this.toastService.showSuccess('Đăng ký thành công');
        },
        () => {
          this.toastService.showError('Đăng ký thất bại');
        }
      );
    }
  }
}
