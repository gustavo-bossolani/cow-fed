import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SidebarMenuService } from '../../components/sidebar-menu/services/sidebar-menu.service';

@Injectable({
  providedIn: 'root'
})
export class PublicSectionGuard {

  constructor(
    private sideMenuService: SidebarMenuService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    this.sideMenuService.isSideBarEnabled.next(false);

    return true;
  }

}
