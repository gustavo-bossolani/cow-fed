import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputModule } from './components/input/input.module';
import { ButtonModule } from './components/button/button.module';

import { ErrorIndicatorDirective } from './directives/error-indicator.directive';

@NgModule({
  declarations: [
    ErrorIndicatorDirective,
  ],
  imports: [
    CommonModule,
    InputModule,
    ButtonModule
  ],
  exports: [
    ErrorIndicatorDirective,
  ]
})
export class SharedModule { }
