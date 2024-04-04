import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  constructor(public statusService: StatusService) { }
}

