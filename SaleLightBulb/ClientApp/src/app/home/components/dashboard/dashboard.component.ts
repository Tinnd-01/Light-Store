import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryApiProxy } from 'src/app/api/services/category.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { ConfirmationService } from 'primeng/api';
import { ProductDto } from 'src/app/api/models/productDto';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { ToastService } from 'src/app/base/services/toast.service';
import { CartApiProxy } from 'src/app/api/services/cart.service';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent {
  categories$ = this.categoryService.getDashboard().pipe(
    map((res) => {
      const categories = res;
      categories.forEach((category) => {
        category.products = category.products.slice(0, 4);
      });
      return categories;
    })
  );

  constructor(
    private categoryService: CategoryApiProxy,
    private router: Router,
    private toastService: ToastService,
    private orderService: OrderService,
    private authService: AuthResolverService,
    private confirmationService: ConfirmationService,
    private cartService: CartApiProxy
  ) {
    super();
  }

  goToProductsOfCategoryId(id: number) {
    this.router.navigate([RouteConstant.CATEGORY, id]);
  }

  goToProductDetail(id: number) {
    this.router.navigate([RouteConstant.PRODUCT, id]);
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
          this.router.navigate([`/${RouteConstant.SIGN_IN}`]);
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
