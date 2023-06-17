import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { SectionTitleModule } from '../shared/components/section-title/section-title.module';

import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SectionTitleModule
  ]
})
export class OverviewModule { }
