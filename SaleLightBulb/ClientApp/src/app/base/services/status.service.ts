import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Model } from '../model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusCodeModel = Model.create<number>(0);
  private busyStackModel = Model.create<boolean[]>([]);

  public readonly busy$ = this.busyStackModel.data$.pipe(map((x) => x.length > 0));
  public readonly statusCode$ = this.statusCodeModel.data$;

  set busy(value: boolean) {
    const currentStack = this.busyStackModel.get().slice();

    if (value) {
      currentStack.push(true);
    } else {
      currentStack.pop();
    }
    this.busyStackModel.set(currentStack);
  }

  set statusCode(statusCode: number) {
    this.statusCodeModel.set(statusCode);
  }
}
