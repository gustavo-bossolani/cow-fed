import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartModule } from 'primeng/chart';

import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [
    ChartModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
