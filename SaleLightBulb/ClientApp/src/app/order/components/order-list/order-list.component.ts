import { DialogService } from 'primeng/dynamicdialog';
import { RouteConstant } from 'src/app/base/constants';
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/common/base.component';
import { Router } from '@angular/router';
import { OrderDto } from 'src/app/api/models/orderDto';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { AuthResolverService } from 'src/app/base/services/auth-resolver.service';
import { OrderService } from '../../services/order.service';
import { ContactInformationComponent } from '../contact-information/contact-information.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent extends BaseComponent {
  orderList$ = new BehaviorSubject<OrderDto[]>([]);
  currentUserId = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public authResolver: AuthResolverService,
    private dialogService: DialogService
  ) {
    super();
    this.currentUserId = this.authResolver.currentUser?.id ?? 0;
  }

  *onSubscribe() {
    yield this.orderService.getOrdersOfCurrentUser().subscribe((val) => {
      this.orderList$.next(val);
    });
  }

  onItemClick(order: OrderDto) {
    this.router.navigate(['/product', order.productId]);
  }

  remove(order: OrderDto) {
    this.confirmationService.confirm({
      header: 'Xác nhận xóa đơn đặt hàng',
      message: 'Bạn có chắc chắn muốn xóa đơn đặt hàng này không?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.removeOrder(order).subscribe(() => {
          const orders = this.orderList$
            .getValue()
            .filter((o) => o.id !== order.id);
          this.orderList$.next(orders);
        });
      },
    });
  }

  edit(order: OrderDto) {
    this.router.navigate([RouteConstant.ORDER, order.id]);
  }

  contact(order: OrderDto) {
    this.dialogService.open(ContactInformationComponent, {
      data: order.orderByUser,
      header: 'Thông tin liên hệ',
      width: '50%',
    })
  }

  decreaseAmount(order: OrderDto) {
    if (order.amount > 1) {
      this.orderService.decreaseProductAmount(order.id).subscribe((val) => {
        const orders = this.orderList$.getValue();
        const index = orders.findIndex((o) => o.id === order.id);
        orders[index].amount = val.amount;
        this.orderList$.next(orders);
      });
    }
  }

  increaseAmount(order: OrderDto) {
    this.orderService.increaseProductAmount(order.id).subscribe((val) => {
      const orders = this.orderList$.getValue();
      const index = orders.findIndex((o) => o.id === order.id);
      orders[index].amount = val.amount;
      this.orderList$.next(orders);
    });
  }
}
