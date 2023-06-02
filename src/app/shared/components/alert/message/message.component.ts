import { AfterViewInit, Component, ComponentRef, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { AlertType } from '../models/alert.model';
import { Subject, interval, map, of, takeUntil, tap, timer } from 'rxjs';

import { CloseEvent } from '../models/close-event.model';

@Component({
  selector: 'cow-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements AfterViewInit {

  @ViewChild('alert', { static: false })
  element!: ElementRef<HTMLDivElement>;

  @Input()
  message = '';

  @Input()
  type: AlertType = AlertType.INFO;

  @Input()
  componentRef!: ComponentRef<MessageComponent>;

  protected onCloseButton = new Subject<string>();

  ngAfterViewInit(): void {
    this.showAlert();
    this.timer();
  }

  timer() {
    timer(7000)
      .pipe(
        takeUntil(this.onCloseButton)
      )
      .subscribe({
        complete: () => this.closeAlert()
      });
  }

  private closeAlert() {
    const closeEvent = new CustomEvent<CloseEvent>(
      'close-alert',
      {
        detail: {
          close: (container: ViewContainerRef) => {
            setTimeout(() => {
              const index = container.indexOf(this.componentRef.hostView);
              container.remove(index);
            }, 300);
            this.element.nativeElement.classList.remove('showed');
          }
        }
      }
    );
    window.dispatchEvent(closeEvent);
  }

  private showAlert(): void {
    setTimeout(
      () => this.element.nativeElement.classList.add('showed')
    );
  }
}
