import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { StatusService } from './status.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpStatusInterceptor implements HttpInterceptor {
  constructor(
    private statusService: StatusService,
    private toast: ToastService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.statusService.busy = true;
    return next.handle(request).pipe(
      finalize(() => (this.statusService.busy = false)),
      catchError((error: HttpErrorResponse) => {
        let message = error.error;
        if (error.status === 403) {
          message = 'Bạn không có quyền truy cập';
        } else if (
          error.status === HttpStatusCode.Unauthorized ||
          error.statusText === 'Unknown Error'
        ) {
          message = 'Đăng nhập và thử lại';
        } else if (error.status === HttpStatusCode.NotFound) {
          message = 'Không tìm thấy dữ liệu';
        } else if (error.status === HttpStatusCode.InternalServerError) {
          message = 'Có lỗi xảy ra vui lòng thử lại sau';
        }

        if (message && !message.includes('locolhost')) {
          this.toast.showError(message);
        }

        console.log(error);

        this.statusService.statusCode = error.status;
        throw throwError(() => error);
      })
    );
  }
}
