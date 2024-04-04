import { ConfirmationService } from 'primeng/api';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/api/models/userDto';
import { BaseComponent } from 'src/app/base/common/base.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/base/constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseComponent {
  users$ = new BehaviorSubject<UserDto[]>([]);
  selectedUsers: UserDto[] = [];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {
    super();
  }

  *onSubscribe() {
    yield this.userService.getUsers().subscribe((users) => {
      this.users$.next(users);
    });
  }

  onEdit(user: UserDto) {
    this.router.navigate([RouteConstant.USER, user.id]);
  }

  onDelete(user: UserDto) {
    this.confirmationService.confirm({
      header: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa người dùng này không?',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.users$.next(this.users$.value.filter((u) => u.id !== user.id));
        });
      },
    });
  }
}
