import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementComponent } from './statement.component';
import { NewStatementComponent } from './new-statement/new-statement.component';

const routes: Routes = [
  {
    path: '',
    component: StatementComponent,
  },
  {
    path: 'new',
    component: NewStatementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementRoutingModule { }
