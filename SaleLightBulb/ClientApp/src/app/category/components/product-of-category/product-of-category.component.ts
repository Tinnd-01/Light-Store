import { ToastService } from './../../../base/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiProxy } from './../../../api/services/product.service';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from 'src/app/api/models/productDto';
import { BaseComponent } from 'src/app/base/common/base.component';
import { CategoryDto } from 'src/app/api/models/categoryDto';
import { CategoryApiProxy } from 'src/app/api/services/category.service';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { ConfirmationService } from 'primeng/api';
import { CartApiProxy } from 'src/app/api/services/cart.service';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-product-of-category',
  templateUrl: './product-of-category.component.html',
  styleUrls: ['./product-of-category.component.scss'],
})
export class ProductOfCategoryComponent extends BaseComponent {
  products$ = new BehaviorSubject<ProductDto[]>([]);
  category$ = new BehaviorSubject<CategoryDto | null>(null);
  categoryId = 0;
  layout: string = 'grid';

  constructor(
    private productService: ProductApiProxy,
    private categoryService: CategoryApiProxy,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private orderService: OrderService,
    private authService: AuthResolverService,
    private confirmationService: ConfirmationService,
    private cartService: CartApiProxy
  ) {
    super();
  }

  *onSubscribe() {
    yield this.route.paramMap.subscribe(() => {
      this.categoryId = this.route.snapshot.params.id;
      this.categoryService.getCategory(this.categoryId).subscribe((value) => {
        this.category$.next(value);
      });
      this.productService
        .getProductByCategoryId(this.categoryId)
        .subscribe((value) => {
          this.products$.next(value);
        });
    });
  }

  onItemClick(product: ProductDto) {
    this.router.navigate(['/product', product.id]);
  }

  orderNow(product: ProductDto) {
    if (this.authService.isLogin$.value) {
      this.orderService.orderNow(product.id).subscribe((value) => {
        this.toastService.showSuccess(
          `Đặt hàng sản phẩm <b>${product.name}</b> thành công. Chi tiết đơn hàng xem tại <a href="/${RouteConstant.ORDER}">đây</a>`
        );
      });
    } else {
      this.confirmationService.confirm({
        header: 'Bạn chưa đăng nhập',
        message: 'Bạn cần đăng nhập để thực hiện chức năng này',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate([RouteConstant.SIGN_IN]);
        },
      });
    }
  }

  addToCart(product: ProductDto) {
    if (this.authService.isLogin$.value) {
      this.cartService.addProductToCart(product.id).subscribe((value) => {
        this.authService.reloadCartLength();
        this.toastService.showSuccess(
          `Thêm sản phẩm <b>${product.name}</b> vào giỏ hàng thành công. Chi tiết xem tại <a href="/${RouteConstant.CART}">đây</a>`
        );
      });
    } else {
      this.confirmationService.confirm({
        header: 'Bạn chưa đăng nhập',
        message: 'Bạn cần đăng nhập để thực hiện chức năng này',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate([`/${RouteConstant.SIGN_IN}`]);
        },
      });
    }
  }
}
