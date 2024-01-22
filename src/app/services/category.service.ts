import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryResponse } from '../models/category-response.model';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryResponse>(`${environment.TheMealApi}/categories.php`)
      .pipe(map((response: CategoryResponse) => response.categories));
  }
}
