import { tap } from 'rxjs/operators';
import { BaseService } from './../../base/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from 'src/app/api/models/orderDto';
import { ToastService } from 'src/app/base/services/toast.service';
import { OrderApiProxy } from 'src/app/api/services/order.service';
import { ProductDto } from 'src/app/api/models/productDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor(private orderService: OrderApiProxy, toast: ToastService) {
    super(toast);
  }

  public orderNow(idProduct: number): Observable<ProductDto> {
    return this.orderService.orderNow(idProduct);
  }

  public getOrdersOfCurrentUser(): Observable<OrderDto[]> {
    return this.orderService.getOrdersOfCurrentUser().pipe(this.registerAction);
  }

  public getOrderById(orderId: number): Observable<OrderDto> {
    return this.orderService.getOrderById(orderId).pipe(this.registerAction);
  }

  public decreaseProductAmount(orderId: number): Observable<OrderDto> {
    return this.orderService.decreaseProductAmount(orderId).pipe(
      this.registerAction,
      tap({
        next: (val) => {
          if (val) {
            this.toastService.showSuccess('Cập nhật thành công');
          }
        },
      })
    );
  }

  public increaseProductAmount(orderId: number): Observable<OrderDto> {
    return this.orderService.increaseProductAmount(orderId).pipe(
      this.registerAction,
      tap({
        next: (val) => {
          if (val) {
            this.toastService.showSuccess('Cập nhật thành công');
          }
        },
      })
    );
  }

  public removeOrder(order?: OrderDto): Observable<void> {
    return this.orderService
      .removeOrder(order?.id ?? 0)
      .pipe(
        this.registerAction,
        tap({ next: () => this.toastService.showSuccess('Xóa đơn đặt hàng thành công') })
      );
  }

  public updateOrderAddress(
    orderId: number,
    addressId: number
  ): Observable<OrderDto> {
    return this.orderService.updateOrderAddress(orderId, addressId).pipe(
      this.registerAction,
      tap({
        next: (val) => {
          if (val) {
            this.toastService.showSuccess('Cập nhật thành công');
          }
        },
      })
    );
  }
}
