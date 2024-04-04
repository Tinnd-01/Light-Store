import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({ template: '' })
export abstract class BaseComponent implements AfterViewInit, OnDestroy {
  protected subscriptions: Subscription[] = [];

  canDeactivate(): boolean | Observable<boolean> {
    return true;
  }

  *onSubscribe(): Iterable<Subscription> {
    return [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  ngAfterViewInit() {
    for (const s of this.onSubscribe()) {
      this.subscriptions.push(s);
    }
  }
}
