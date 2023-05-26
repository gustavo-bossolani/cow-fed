import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputModule } from './components/input/input.module';
import { ButtonModule } from './components/button/button.module';
import { LoaderModule } from './components/loader/loader.module';
@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ButtonModule,
    LoaderModule
  ]
})
export class SharedModule { }
