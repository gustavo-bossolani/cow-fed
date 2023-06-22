import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StatementRoutingModule } from './statement-routing.module';

import { SectionTitleModule } from '../shared/components/section-title/section-title.module';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { InputModule } from '../shared/components/input/input.module';
import { SelectModule } from '../shared/components/select/select.module';

import { StatementComponent } from './statement.component';
import { NewStatementComponent } from './new-statement/new-statement.component';

@NgModule({
  declarations: [
    StatementComponent,
    NewStatementComponent
  ],
  imports: [
    CommonModule,
    StatementRoutingModule,
    SectionTitleModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    LoaderModule,
    SelectModule
  ]
})
export class StatementModule { }
