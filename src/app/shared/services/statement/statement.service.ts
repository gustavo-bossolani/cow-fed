import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Statement } from '../../models/statement/statement.model';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  private authRoute = 'statement';

  constructor(
    private http: HttpClient
  ) { }

  createStatement(statement: Statement): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/${this.authRoute}`, statement);
  }
}
