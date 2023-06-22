import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuItem, PrimeIcons } from 'primeng/api';
import { Menu } from 'primeng/menu';

import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'cow-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.sass']
})
export class SidebarMenuComponent implements OnInit, OnDestroy {

  @ViewChild('container')
  container!: Menu;

  protected items: MenuItem[] = [
    {
      label: 'Dashboard',
      items: [
        {
          label: 'Geral',
          icon: PrimeIcons.BOOK,
          routerLink: '/overview'
        }
      ]
    },
    {
      label: 'Categorias',
      items: [
        {
          label: 'Criar um novo',
          icon: PrimeIcons.PLUS,
          routerLink: '/categories'
        }
      ]
    },
    {
      label: 'Apontamentos',
      items: [
        {
          label: 'Geral',
          icon: PrimeIcons.BOOK,
          routerLink: '/statements',
        },
        {
          label: 'Criar um novo',
          icon: PrimeIcons.PLUS,
          routerLink: '/statements/new',
        },
      ]
    },
    {
      label: '',
      items: [
        {
          label: 'Sair',
          icon: PrimeIcons.TIMES_CIRCLE,
          command: () => this.authService.logout()
        }
      ]
    },
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verifyUserInformation();
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  };

  private verifyUserInformation(): void {
    if (!this.userService.user$.value) {
      this.userService.getUser().subscribe();
    }
  }
}
