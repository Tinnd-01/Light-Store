import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { CartDto } from 'src/app/api/models/cartDto';
import { BaseComponent } from 'src/app/base/common/base.component';
import { CartApiProxy } from 'src/app/api/services/cart.service';
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/base/constants';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'src/app/base/services/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent extends BaseComponent {
  carts$ = new BehaviorSubject<CartDto[]>([]);
  constructor(
    private cartService: CartApiProxy,
    private router: Router,
    private confirmationService: ConfirmationService,
    private authResolver: AuthResolverService,
    protected toastService: ToastService
  ) {
    super();
  }

  *onSubscribe() {
    yield this.cartService
      .getCartOfCurrentUser()
      .subscribe((carts) => this.carts$.next(carts));
  }

  onItemClick(cart: CartDto) {
    this.router.navigate([RouteConstant.PRODUCT, cart.productId]);
  }

  decreaseAmount(cart: CartDto) {
    this.cartService.decreaseProductAmount(cart.id).subscribe((value) => {
      this.carts$.next(
        this.carts$.value.map((x) => {
          if (x.id === value.id) {
            x.amount = value.amount;
          }
          return x;
        })
      );
    });
  }

  increaseAmount(cart: CartDto) {
    this.cartService.increaseProductAmount(cart.id).subscribe((value) => {
      this.carts$.next(
        this.carts$.value.map((x) => {
          if (x.id === value.id) {
            x.amount = value.amount;
          }
          return x;
        })
      );
    });
  }

  orderNow(cart: CartDto) {
    this.cartService.orderProductInCart(cart.id).subscribe((value) => {
      this.authResolver.reloadCartLength();
      this.router.navigate([RouteConstant.ORDER, value.id]);
      this.toastService.showSuccess(
        `Đặt hàng sản phẩm <b>${cart.product.name}</b> thành công. Chi tiết đơn hàng xem tại <a href="/${RouteConstant.ORDER}">đây</a>`
      );
    });
  }

  remove(cart: CartDto) {
    this.confirmationService.confirm({
      header: 'Xác nhận xóa sản phẩm trong giỏ hàng',
      message: 'Bạn có chắc chắn muốn xóa sản phẩm trong giỏ hàng này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cartService.deleteCart(cart.id).subscribe((value) => {
          this.carts$.next(this.carts$.value.filter((x) => x.id !== cart.id));
          this.authResolver.reloadCartLength();
        });
      },
    });
  }
}
