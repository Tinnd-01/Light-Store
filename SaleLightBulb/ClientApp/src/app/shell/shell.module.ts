import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './components/shell/shell.component';
import { RouterModule } from '@angular/router';
import { BaseModule } from '../base/base.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, BaseModule, RouterModule],
  exports: [ShellComponent],
})
export class ShellModule { }
