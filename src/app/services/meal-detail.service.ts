import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MealDetail } from '../models/meal-detail.model';
import { MealDetailResponse } from '../models/meal-detail-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MealDetailService {
  constructor(private http: HttpClient) {}

  getMealById(id: string): Observable<MealDetail> {
    return this.http
      .get<MealDetailResponse>(`${environment.TheMealApi}/lookup.php?i=${id}`)
      .pipe(map((response: MealDetailResponse) => response.meals[0]));
  }
}
