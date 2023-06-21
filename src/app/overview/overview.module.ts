import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { SectionTitleModule } from '../shared/components/section-title/section-title.module';

import { OverviewComponent } from './overview.component';

import { LoaderModule } from '../shared/components/loader/loader.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ChartModule,
    LoaderModule,
    ButtonModule,
    SectionTitleModule,
  ],
})
export class OverviewModule { }
