import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PrivateSectionGuard } from './shared/guards/private-section/private-section.guard';
import { PublicSectionGuard } from './shared/guards/public-section/public-section.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    canActivate: [PublicSectionGuard],
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    canActivate: [PublicSectionGuard],
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'overview',
    canActivate: [PrivateSectionGuard],
    loadChildren: () => import('./overview/overview.module')
      .then(m => m.OverviewModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
