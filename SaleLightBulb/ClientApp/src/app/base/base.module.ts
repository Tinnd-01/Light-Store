import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { SplitterModule } from 'primeng/splitter';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { PageNotFindComponent } from './components/page-not-find/page-not-find.component';
import { DataViewModule } from 'primeng/dataview';
import { MoneyPipe } from './pipes/money.pipe';

const RELAYED_EXPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  CheckboxModule,
  ChipsModule,
  ConfirmDialogModule,
  DropdownModule,
  DynamicDialogModule,
  EditorModule,
  FieldsetModule,
  FileUploadModule,
  InplaceModule,
  InputNumberModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  ListboxModule,
  MenubarModule,
  MenuModule,
  MultiSelectModule,
  OverlayPanelModule,
  PaginatorModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  RatingModule,
  ScrollPanelModule,
  SelectButtonModule,
  SidebarModule,
  SplitButtonModule,
  TableModule,
  TabMenuModule,
  TabViewModule,
  ToastModule,
  ToolbarModule,
  PasswordModule,
  TooltipModule,
  TreeModule,
  TreeSelectModule,
  TreeTableModule,
  OrderListModule,
  SplitterModule,
  InputMaskModule,
  MessageModule,
  GalleriaModule,
  DataViewModule,
];

const DECLARED_EXPORTS = [SpinnerComponent, FormFieldComponent, MoneyPipe];

@NgModule({
  declarations: [SpinnerComponent, FormFieldComponent, PageNotFindComponent, MoneyPipe],
  providers: [DialogService],
  imports: [RouterModule, ...RELAYED_EXPORTS],
  exports: [...RELAYED_EXPORTS, ...DECLARED_EXPORTS],
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
    };
  }
}
