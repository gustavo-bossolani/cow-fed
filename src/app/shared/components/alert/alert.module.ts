import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { MessageComponent } from './message/message.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AlertComponent,
    MessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule { }
