import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { NgControl, AbstractControl, FormControl, FormArrayName } from '@angular/forms';
import { BaseComponent } from '../../common/base.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent
  extends BaseComponent
  implements AfterContentInit {
  @Input() label: string = '';
  @Input() preventErrorUseSpace: boolean = true;

  @ContentChild(NgControl) ngControl?: NgControl;
  @ContentChild(FormArrayName) formArrayName?: FormArrayName;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterContentInit() {
    this.subscriptions.push(
      this.control.statusChanges.subscribe(() => this.cdr.markForCheck())
    );
  }

  get invalid() {
    return this.isInvalid(this.control);
  }

  private isInvalid(control: AbstractControl) {
    return control?.invalid && control?.dirty;
  }

  get control(): AbstractControl {
    return (this.formArrayName || this.ngControl)?.control ?? new FormControl();
  }

  get isRequired(): boolean {
    if (this.control?.validator) {
      const validator = this.control.validator({} as AbstractControl);
      return validator && validator.required;
    }

    return false;
  }

  getErrorMessage(): string {
    const errors = this.control ? this.control.errors || {} : {};
    for (const errorKey of Object.keys(errors)) {
      const errorParams = errors[errorKey];

      if (errorParams.message) {
        return errorParams.message ?? '';
      }
      switch (errorKey) {
        case 'required':
          return 'Cần nhập trường này';
        case 'minlength':
          return `Cần nhập ít nhất ${errorParams.requiredLength} ký tự`;
        case 'maxlength':
          return `Cần nhập nhiều nhất ${errorParams.requiredLength} ký tự`;
        case 'email':
          return 'Email không hợp lệ';

        default:
          return errorKey ?? '';
      }
    }

    return '';
  }
}
