import { Injectable } from '@angular/core';

import { Alert } from '../models/alert.model';

@Injectable()
export class AlertService {
  public openAlert({ type, message }: Alert): void {
    const event = new CustomEvent(
      'alert',
      { detail: { type, message } }
    );

    window.dispatchEvent(event);
  }
}
