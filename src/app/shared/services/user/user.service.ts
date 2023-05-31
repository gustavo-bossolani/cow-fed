import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRoute = 'user';

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.userRoute}`);
  }
}
