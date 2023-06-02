import { ViewContainerRef } from '@angular/core';

interface CloseEvent {
  close: (container: ViewContainerRef) => void;
}

export { CloseEvent };
