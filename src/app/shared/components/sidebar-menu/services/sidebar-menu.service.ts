import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  /**
   * Use para esconder o menu lateral
   *
   * @example caso o usuário esteja ou não logado
   */
  public readonly isSideBarEnabled = new BehaviorSubject(false);

  /**
   * Use para desabilitar o menu lateral
   *
   * @example ao aguardar a resposta de um serviço finalizar
   */
  public readonly isLoading = new BehaviorSubject(false);

  constructor() { }
}
