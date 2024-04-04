import { CartApiProxy } from 'src/app/api/services/cart.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ProductDto } from 'src/app/api/models/productDto';
import { ProductApiProxy } from 'src/app/api/services/product.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { ToastService } from 'src/app/base/services/toast.service';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent extends BaseComponent {
  public wishList$ = this.productService.getWishListOfCurrentUser();

  constructor(
    private productService: ProductApiProxy,
    private router: Router,
    private toastService: ToastService,
    private orderService: OrderService,
    private authService: AuthResolverService,
    private confirmationService: ConfirmationService,
    private cartService: CartApiProxy
  ) {
    super();
  }

  onItemClick(product: ProductDto) {
    this.router.navigate(['/product', product.id]);
  }

  removeToWishList(product: ProductDto) {
    this.productService.addToWishListOfCurrentUser(product.id).subscribe(() => {
      this.wishList$ = this.productService.getWishListOfCurrentUser();
      this.toastService.showSuccess(
        'Xóa sản phẩm khỏi danh sách yêu thích thành công'
      );
    });
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
