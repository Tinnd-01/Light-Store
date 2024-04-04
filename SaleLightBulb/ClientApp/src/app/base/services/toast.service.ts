import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService, private router: Router) { }

  public showSuccess(message: string, hideAfter: number = 4000): void {
    this.show(message, 'success', hideAfter);
  }

  public showError(message: string, hideAfter: number = 4000): void {
    this.show(message, 'error', hideAfter);
  }

  private show(message: string, type: string, hideAfter: number): void {
    this.messageService.add({ severity: type, detail: message, life: hideAfter });
  }
}
