import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected errorMessage = 'Có lỗi xảy ra, vui lòng thử lại sau';
  constructor(protected toastService: ToastService) {}

  registerAction = <T>(source: Observable<T>) => {
    return new Observable<T>((subscriber) => {
      source.subscribe(
        (next) => subscriber.next(next),
        (err) => {
          this.toastService.showError(this.errorMessage);
        }
      );
    });
  };
}
