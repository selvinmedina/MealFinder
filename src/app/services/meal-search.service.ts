import { Injectable } from '@angular/core';
import { MealDetailResponse } from '../models/meal-detail-response.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { MealDetail } from '../models/meal-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MealSearchService {
  constructor(private http: HttpClient) {}

  searchMeal(name: string): Observable<MealDetail[]> {
    return this.http
      .get<MealDetailResponse>(`${environment.TheMealApi}/search.php?s=${name}`)
      .pipe(map((response: MealDetailResponse) => response.meals));
  }
}
