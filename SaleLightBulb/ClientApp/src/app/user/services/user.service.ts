import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserDto } from 'src/app/api/models/userDto';
import { UserApiProxy } from 'src/app/api/services/user.service';
import { BaseService } from 'src/app/base/services/base.service';
import { ToastService } from 'src/app/base/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(toastService: ToastService, private userService: UserApiProxy) {
    super(toastService);
  }

  getUsers(): Observable<UserDto[]> {
    return this.userService.getUsers().pipe(this.registerAction);
  }

  deleteUser(id: number) {
    return this.userService.deleteUser(id).pipe(
      this.registerAction,
      tap({
        next: () => {
          this.toastService.showSuccess('Xóa người dùng thành công');
        },
      })
    );
  }
  updateUser(user: UserDto) {
    return this.userService.updateUser(user).pipe(
      this.registerAction,
      tap({
        next: () => {
          this.toastService.showSuccess('Cập nhật thành công');
        },
      })
    );
  }

  getUserById(userId: any) {
    return this.userService.getUserById(userId).pipe(this.registerAction);
  }
}
