import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from 'src/app/api/models/productDto';
import { CartApiProxy } from 'src/app/api/services/cart.service';
import { ProductApiProxy } from 'src/app/api/services/product.service';
import { BaseComponent } from 'src/app/base/common/base.component';
import { RouteConstant } from 'src/app/base/constants';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { ToastService } from 'src/app/base/services/toast.service';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent extends BaseComponent {
  products$ = new BehaviorSubject<ProductDto[]>([]);
  layout: string = 'grid';
  searchKey: string = '';

  constructor(
    private productService: ProductApiProxy,
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
      this.searchKey = this.route.snapshot.params.search;
      if (this.searchKey) {
        this.productService.search(this.searchKey).subscribe((value) => {
          this.products$.next(value);
        });
      }
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
