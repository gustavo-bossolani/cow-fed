import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { OverviewAll } from '../../models/overview/overview-all.model';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  private authRoute = 'overview';

  constructor(
    private http: HttpClient
  ) { }

  overviewAll(): Observable<OverviewAll> {
    return this.http.get<OverviewAll>(`${environment.apiUrl}/${this.authRoute}/all`);
  }
}
