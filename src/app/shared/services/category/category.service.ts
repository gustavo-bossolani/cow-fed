import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Category } from '../../models/category/category.model';

interface FilterCategory {
  keySearch: 'id' | 'name';
  value: string
}

export interface CreateCategoryRequest {
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryRoute = 'category';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/${this.categoryRoute}`);
  }

  getCategoryBy({ keySearch, value }: FilterCategory): Observable<Category> {
    let params: URLSearchParams = new URLSearchParams();
    params.set(keySearch, value);

    return this.http.get<Category>(`${environment.apiUrl}/${this.categoryRoute}/by?${params.toString()}`)
  };

  createCategory(category: CreateCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/${this.categoryRoute}`, category);
  }

}
