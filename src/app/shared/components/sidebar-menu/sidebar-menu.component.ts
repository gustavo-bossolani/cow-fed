import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map, tap, Observable } from 'rxjs';

import {
  faChartLine,
  faNoteSticky,
  faReceipt,
  faCircleXmark,
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth/auth.service';
import { SidebarMenuService } from './services/sidebar-menu.service';

import { User } from '../../models/user/user.model';

interface Section extends Object {
  label: string;
  currentSection: boolean;
  path?: string;
  icon?: any;
  logout: boolean;
}

@Component({
  selector: 'cow-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.sass']
})
export class SidebarMenuComponent implements OnInit, OnDestroy {

  get isMenuOpened(): boolean {
    return !this.container.nativeElement.classList.contains('closed');
  };

  @ViewChild('container')
  protected container!: ElementRef<HTMLDivElement>;

  protected sections: Section[] = [
    {
      label: 'Início',
      path: '/overview',
      currentSection: false,
      icon: faChartLine,
      logout: false
    },
    {
      label: 'Apontamentos',
      path: '/appointments',
      currentSection: false,
      icon: faReceipt,
      logout: false
    },
    {
      label: 'Categorias',
      path: '/categories',
      currentSection: false,
      icon: faNoteSticky,
      logout: false
    },
    {
      label: 'Sair',
      currentSection: false,
      icon: faCircleXmark,
      logout: true
    },
  ];

  protected user!: Observable<User>;
  protected menuButtonIcon = faBars;

  private subscriptions: Subscription[] = [];

  constructor(
    protected menuService: SidebarMenuService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.populateMenu(this.router.url);
    this.listenRouterEvents();
    this.user = this.auth.user$.asObservable();
  };

  handleOpenCloseMenu(): void {
    if (this.isMenuOpened) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  navigate(section: Section): void {
    if (section.logout) {
      this.auth.logout();
    } else {
      this.closeMenu();
      this.router.navigate([section.path]);
    }
  };

  ngOnDestroy(): void {
    console.log('side bar destroyed')
    this.subscriptions.forEach(item => item.unsubscribe());
  };

  private listenRouterEvents(): void {
    const subscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd),
        map(event => event.url),
        tap(() => console.log('sidenav navigationend event')),
        tap(url => this.populateMenu(url)),
      )
      .subscribe();

    this.subscriptions.push(subscription);
  };

  private populateMenu(url: string): void {
    this.sections.forEach(section => {
      if (section?.path) {
        if (section.path.includes(url)) {
          section.currentSection = true;
          return;
        } else {
          section.currentSection = false;
        }
      }
    })
  }

  private openMenu(): void {
    this.container.nativeElement.classList.remove('closed');

    this.menuButtonIcon = faXmark;
  };

  private closeMenu(): void {
    this.container.nativeElement.classList.add('closed');

    this.menuButtonIcon = faBars;
  };

}
