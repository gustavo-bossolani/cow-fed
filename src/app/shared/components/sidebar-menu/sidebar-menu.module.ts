import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';
import { SectionTitleModule } from '../section-title/section-title.module';

import { SidebarMenuService } from './services/sidebar-menu.service';

import { SidebarMenuComponent } from './sidebar-menu.component';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [
    CommonModule,
    MenuModule,
    SectionTitleModule
  ],
  exports: [SidebarMenuComponent],
  providers: [SidebarMenuService]
})
export class SidebarMenuModule { }
