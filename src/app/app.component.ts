import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs';

import { SidebarMenuService } from './shared/components/sidebar-menu/services/sidebar-menu.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(
    protected sideBarService: SidebarMenuService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLogged$
      .pipe(
        tap(isLogged => this.sideBarService.isSideBarEnabled.next(isLogged))
      )
      .subscribe();
  }
}
