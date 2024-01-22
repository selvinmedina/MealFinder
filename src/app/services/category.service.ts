import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryResponse } from '../models/category-response.model';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { Meal } from '../models/meal.model';
import { MealResponse } from '../models/meal-response.model';

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

  getMealsByCategory(category: string): Observable<Meal[]> {
    return this.http
      .get<MealResponse>(`${environment.TheMealApi}/filter.php?c=${category}`)
      .pipe(map((response: MealResponse) => response.meals));
  }
}
