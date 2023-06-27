import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule { }
