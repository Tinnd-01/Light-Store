import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDto } from 'src/app/api/models/orderDto';
import { BaseComponent } from 'src/app/base/common/base.component';
import { AddressDto } from 'src/app/api/models/addressDto';
import { AddressApiProxy } from 'src/app/api/services/address.service';
import { ToastService } from 'src/app/base/services/toast.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent extends BaseComponent {
  order$ = new BehaviorSubject<OrderDto | null>(null);
  orderId = 0;
  currentUserId = 0;

  addresses$ = new BehaviorSubject<AddressDto[]>([]);

  contrrols = {
    addressId: new FormControl<number>(0),
  };
  form = new FormGroup(this.contrrols);

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public authResolver: AuthResolverService,
    private addressService: AddressApiProxy,
    private confirmationService: ConfirmationService,
    private toast: ToastService
  ) {
    super();
    this.orderId = this.route.snapshot.params.id;
    this.currentUserId = this.authResolver.currentUser?.id ?? 0;
  }

  *onSubscribe() {
    yield this.orderService.getOrderById(this.orderId).subscribe((order) => {
      this.order$.next(order);
      this.form.patchValue(order);

      this.addressService
        .getAddressesOfUser(order.orderByUserId)
        .subscribe((addresses) => {
          this.addresses$.next(addresses);
        });
    });
  }

  decreaseAmount() {
    const order = this.order$.getValue();
    if (order && order.amount > 1) {
      this.orderService.decreaseProductAmount(order.id).subscribe((val) => {
        this.order$.next(val);
      });
    }
  }

  increaseAmount() {
    const order = this.order$.getValue();
    if (order) {
      this.orderService.increaseProductAmount(order.id).subscribe((val) => {
        this.order$.next(val);
      });
    }
  }

  save() {
    if (this.form.invalid || this.form.value.addressId === 0) {
      return;
    }

    this.orderService
      .updateOrderAddress(this.orderId, this.form.value.addressId ?? 0)
      .subscribe((order) => {
        this.order$.next(order);
        this.form.patchValue(order);
        this.form.markAsPristine();
        this.toast.showSuccess('Cập nhật địa chỉ thành công');
      });
  }

  remove() {
    const order = this.order$.getValue();

    if (!order) {
      return;
    }
    this.confirmationService.confirm({
      header: 'Xác nhận xóa đơn đặt hàng',
      message: 'Bạn có chắc chắn muốn xóa đơn đặt hàng này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.removeOrder(order).subscribe(() => {
          window.history.back();
        });
      },
    });
  }
}
