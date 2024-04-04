import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from 'src/app/api/models/productDto';
import { CategoryApiProxy } from 'src/app/api/services/category.service';
import { ProductApiProxy } from 'src/app/api/services/product.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';

@Component({
  selector: 'app-product-editer',
  templateUrl: './product-editer.component.html',
  styleUrls: ['./product-editer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditerComponent extends BaseComponent {
  title$ = new BehaviorSubject<string>('');

  readonly controls = {
    id: new FormControl(0),
    name: new FormControl<string>('', [Validators.required]),
    code: new FormControl<string>('', [Validators.required]),
    color: new FormControl<string>(''),
    voltageOrPowerCapacity: new FormControl<string>(''),
    amount: new FormControl<number>(0, [Validators.required]),
    size: new FormControl<string>(''),
    price: new FormControl<number>(0, [Validators.required]),
    detail: new FormControl<string>('', [Validators.required]),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    image: new FormControl<string>(''),
  };

  form = new FormGroup(this.controls);

  categories$ = this.categoryService.getAllCategory();

  private product: ProductDto | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductApiProxy,
    private categoryService: CategoryApiProxy,
    private authResolver: AuthResolverService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  *onSubscribe() {
    yield this.route.paramMap.subscribe(() => {
      const id = this.route.snapshot.params.id;

      if (id) {
        this.title$.next('Cập nhật thông tin sản phẩm');
        this.productService.getProductById(id).subscribe((value) => {
          this.product = value;
          this.form.patchValue(value);
        });
      } else {
        this.title$.next('Thêm sản phẩm mới');
      }
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    const product: ProductDto = {
      categoryId: this.controls.categoryId.value ?? 0,
      code: this.controls.code.value ?? '',
      detail: this.controls.detail.value ?? '',
      image: this.controls.image.value ?? '',
      name: this.controls.name.value ?? '',
      voltageOrPowerCapacity: this.controls.voltageOrPowerCapacity.value ?? '',
      price: this.controls.price.value ?? 0,
      size: this.controls.size.value ?? '',
      color: this.controls.color.value ?? '',
      amount: this.controls.amount.value ?? 0,
      id: this.controls.id.value ?? 0,
      addedByUserId: this.authResolver.currentUser?.id ?? 0,
    };
    if (this.controls.id.value === 0) {
      this.productService.addNewProduct(product).subscribe((value) => {
        this.router.navigate([RouteConstant.PRODUCT, value.id]);
      });
    } else {
      product.rowVersion = this.product?.rowVersion;
      this.productService.updateProduct(product).subscribe((value) => {
        this.router.navigate([RouteConstant.PRODUCT, value]);
      });
    }
  }
}
