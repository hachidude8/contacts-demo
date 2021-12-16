import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiException } from '../../../api/cont-demo-api';

@Component({
  selector: 'contd-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnChanges {

  @Input() error: ApiException | undefined;
  @Input() genericMessage = 'An unknown error has occurred';

  hasMessage = false;

  ngOnChanges(changes: SimpleChanges): void {
    const { error } = changes;
    if (error) {
      this.hasMessage = !!error.currentValue && !!error.currentValue.message;
    }
  }

}
