import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastService } from '../../../base/services/toast.service';

@Component({
  selector: 'app-upload-area',
  templateUrl: './upload-area.component.html',
  styleUrls: ['./upload-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadAreaComponent),
      multi: true,
    },
  ],
})
export class UploadAreaComponent implements ControlValueAccessor, OnInit {
  @Input() accept?: string;

  private onChange = (value: any) => { };
  private onTouched = () => { };

  public disabled?: boolean;

  private readonly DRAG_AREA_CLASS = 'drag-area';
  private readonly DROP_AREA_CLASS = 'drop-area';
  public dragAreaClass?: string;
  public draggedFiles: any;
  public value: any;

  constructor(private cdr: ChangeDetectorRef, private toast: ToastService) { }

  writeValue(obj: any): void {
    this.value = obj;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this.dragAreaClass = this.DRAG_AREA_CLASS;
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = this.DROP_AREA_CLASS;
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = this.DROP_AREA_CLASS;
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = this.DRAG_AREA_CLASS;
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = this.DRAG_AREA_CLASS;
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = this.DRAG_AREA_CLASS;
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }
  async saveFiles(files: FileList) {
    if (files.length > 0) {
      if (!this.isMatch(files[0])) {
        this.toast.showError('Không đúng định dạng file');
        return;
      }
      this.draggedFiles = files;
      this.value = await this.convertBase64(files[0]);
      this.onChange(this.value);
      this.cdr.markForCheck();
    }
  }

  onFileChange(event: any) {
    this.saveFiles(event.target.files);
  }

  convertBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  private isMatch(file: File): boolean {
    if (!this.accept) {
      return true;
    }
    return new RegExp(this.accept.replace('*', '.*')).test(file.type);
  }
}
