import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Represents a immutable model state. Normally used in services.
 * The pattern is documented here: https://tomastrajan.github.io/angular-model-pattern-example
 */
export class Model<T> {
  private data: BehaviorSubject<T>;
  data$: Observable<T>;

  static create<T>(initialData: T): Model<T> {
    return new Model<T>(initialData, true);
  }

  static createMutable<T>(initialData: T): Model<T> {
    return new Model<T>(initialData, false);
  }

  static createWithCustomClone<T>(initialData: T, clone: (data: T) => T): Model<T> {
    return new Model<T>(initialData, true, clone);
  }

  constructor(
    initialData: T,
    private immutable: boolean,
    private clone?: (data: T) => T
  ) {
    this.data = new BehaviorSubject(initialData);
    this.data$ = this.data
      .asObservable()
      .pipe(map((data) => this.cloneIfImmutable(data)));
  }

  get(): T {
    return this.data.getValue();
  }

  set(data: T): void {
    this.data.next(data);
  }

  private cloneIfImmutable(value: any): any {
    if (value && this.immutable) {
      if (this.clone) {
        value = this.clone(value);
      } else if (value.clone) {
        value = value.clone();
      } else if (value instanceof Array) {
        value = value.map((item) => this.cloneIfImmutable(item));
      } else if (value instanceof Date) {
        value = new Date(value.getTime());
      } else if (value instanceof Object) {
        value = Object.assign({}, value);
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            value[key] = this.cloneIfImmutable(value[key]);
          }
        }
      } else {
        value = JSON.parse(JSON.stringify(value));
      }
    }

    return value;
  }
}
