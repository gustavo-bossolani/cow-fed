import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';


import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRoute = 'user';

  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.userRoute}`)
      .pipe(
        tap(user => this.user$.next(user))
      );
  }
}
