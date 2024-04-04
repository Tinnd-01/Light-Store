import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserDto } from 'src/app/api/models/userDto';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
})
export class ContactInformationComponent {
  user?: UserDto;
  constructor(private config: DynamicDialogConfig) {
    this.user = this.config.data;
  }
}
