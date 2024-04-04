import { ToastService } from './../../../base/services/toast.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from 'src/app/api/models/productDto';
import { CartApiProxy } from 'src/app/api/services/cart.service';
import { ProductApiProxy } from 'src/app/api/services/product.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent extends BaseComponent {
  private productId = 0;
  product$ = new BehaviorSubject<ProductDto | null>(null);
  isWishList$ = new BehaviorSubject<boolean>(false);

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductApiProxy,
    public authResolver: AuthResolverService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toast: ToastService,
    private orderService: OrderService,
    private cartService: CartApiProxy
  ) {
    super();
  }

  *onSubscribe() {
    yield this.route.paramMap.subscribe(() => {
      this.productId = this.route.snapshot.params.id;

      this.productService.getProductById(this.productId).subscribe((value) => {
        value.detail = value.detail?.replace(/(?:\r\n|\r|\n)/g, '<br>');
        this.product$.next(value);
        this.isWishList$.next(value.isWishList ?? false);
      });
    });
  }

  removeProduct() {
    this.confirmationService.confirm({
      header: 'Xác nhận xóa sản phẩm',
      message: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.removeProduct(this.productId).subscribe(() => {
          this.toast.showSuccess('Xóa sản phẩm thành công');
          window.history.back();
        });
      },
    });
  }

  editProduct() {
    this.router.navigate([
      RouteConstant.PRODUCT,
      RouteConstant.EDIT_PRODUCT,
      this.productId,
    ]);
  }

  addToWishList() {
    if (this.authResolver.isLogin$.value) {
      this.productService
        .addToWishListOfCurrentUser(this.productId)
        .subscribe((val) => {
          this.isWishList$.next(val);
          if (val) {
            this.toast.showSuccess(
              `Thêm sản phẩm <b>${this.product$.value?.name}</b> vào danh sách yêu thích thành công`
            );
          } else {
            this.toast.showSuccess(
              `Xóa sản phẩm <b>${this.product$.value?.name}</b> khỏi danh sách yêu thích thành công`
            );
          }
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

  orderNow() {
    if (this.authResolver.isLogin$.value) {
      this.orderService.orderNow(this.productId).subscribe((value) => {
        this.toast.showSuccess(
          `Đặt hàng sản phẩm <b>${this.product$.value?.name}</b> thành công. Chi tiết đơn hàng xem tại <a routerLink="${RouteConstant.ORDER}">đây</a>`
        );
        this.product$.next(value);
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

  addToCart() {
    const product = this.product$.value;
    if (this.authResolver.isLogin$.value && product) {
      this.cartService.addProductToCart(product.id).subscribe((value) => {
        this.authResolver.reloadCartLength();
        this.toast.showSuccess(
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
