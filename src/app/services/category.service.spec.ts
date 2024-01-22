import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { CategoryResponse } from '../models/category-response.model';
import { MealResponse } from '../models/meal-response.model';
import { environment } from '../../environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Ensure that there are no outstanding requests
  });

  it('should fetch categories', () => {
    const mockCategories: CategoryResponse = { categories: [{ idCategory: '1', strCategory: 'Beef', strCategoryThumb: '', strCategoryDescription: '' }] };

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(1);
      expect(categories).toEqual(mockCategories.categories);
    });

    const req = httpMock.expectOne(`${environment.TheMealApi}/categories.php`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch meals by category', () => {
    const mockMeals: MealResponse = { meals: [{ strMeal: 'Beef stew', strMealThumb: '', idMeal: '1' }] };

    service.getMealsByCategory('Beef').subscribe(meals => {
      expect(meals.length).toBe(1);
      expect(meals).toEqual(mockMeals.meals);
    });

    const req = httpMock.expectOne(`${environment.TheMealApi}/filter.php?c=Beef`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMeals);
  });
});
