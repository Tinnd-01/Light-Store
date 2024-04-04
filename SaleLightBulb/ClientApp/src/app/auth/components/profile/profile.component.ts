import { Role } from './../../../api/models/role';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { distinctUntilChanged } from 'rxjs';
import { UserDto } from 'src/app/api/models/userDto';
import { UserApiProxy } from 'src/app/api/services/user.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { Utils } from 'src/app/base/helper/utils';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent {
  public readonly controls = {
    id: new FormControl(0),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    addresses: new FormArray<FormGroup>([], [Validators.required]),
    rowVersion: new FormControl(null),
    role: new FormControl(Role.User),
  };
  public form: FormGroup;

  constructor(
    private authResolver: AuthResolverService,
    private confirmationService: ConfirmationService,
    private userService: UserApiProxy
  ) {
    super();
    this.controls.email.disable();
    this.form = new FormGroup(this.controls);
  }

  get addressFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(0),
      city: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      addressDetail: new FormControl(null, [Validators.required]),
      rowVersion: new FormControl(null),
      canDelete: new FormControl(true),
    });
  }

  *onSubscribe() {
    yield this.controls.phoneNumber.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.controls.phoneNumber.setValue(
          Utils.removeNotDigitCharacters(val ?? '') ?? ''
        );
      });

    yield this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.authResolver.currentUser = user;
        user.addresses.forEach((address) => {
          this.controls.addresses.push(this.addressFormGroup);
        });
        this.form.patchValue(this.authResolver.currentUser);
      }
    });
  }

  save() {
    if (this.form.invalid) return;

    this.confirmationService.confirm({
      header: 'Xác nhận lưu thay đổi',
      message: 'Bạn có chắc chắn muốn lưu những thay đổi này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const user: UserDto = this.form.value;
        this.userService.updateProfile(user).subscribe((res) => {
          if (res) {
            this.authResolver.currentUser = res;
            this.form.reset(this.authResolver.currentUser);
          }
        });
      },
    });
  }

  cancel() {
    this.confirmationService.confirm({
      header: 'Xác nhận hủy bỏ thay đổi',
      message: 'Bạn có chắc chắn muốn hủy bỏ những thay đổi này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.form.reset(this.authResolver.currentUser);
      },
    });
  }

  removeAddress(rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.controls.addresses.removeAt(rowIndex);
        this.controls.addresses.markAsDirty();
      },
    });
  }

  addAddress() {
    this.controls.addresses.push(this.addressFormGroup);
    this.controls.addresses.markAsDirty();
  }
}
