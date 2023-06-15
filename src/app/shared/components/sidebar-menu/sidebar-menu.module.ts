import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SidebarMenuService } from './services/sidebar-menu.service';

import { SidebarMenuComponent } from './sidebar-menu.component';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [SidebarMenuComponent],
  providers: [SidebarMenuService]
})
export class SidebarMenuModule { }
