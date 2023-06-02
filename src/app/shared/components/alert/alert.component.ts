import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Alert } from './models/alert.model';

import { MessageComponent } from './message/message.component';
import { fromEvent, map } from 'rxjs';

import { CloseEvent } from './models/close-event.model';


@Component({
  selector: 'cow-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {

  @ViewChild('messageContainer', { read: ViewContainerRef })
  private _container!: ViewContainerRef;

  ngOnInit(): void {
    fromEvent<CustomEvent<Alert>>(window, 'alert')
    .pipe(
      map(event => event.detail),
      map(detail => this.showMessage(detail))
    )
    .subscribe();

    fromEvent<CustomEvent<CloseEvent>>(window, 'close-alert')
    .pipe(
      map(event => event.detail.close(this._container)),
    )
    .subscribe();
  }

  private showMessage({ type, message }: Alert): void {
    const componentRef = this._container.createComponent(MessageComponent);

    componentRef.setInput('type', type);
    componentRef.setInput('message', message);
    componentRef.setInput('componentRef', componentRef);
  }

}
