import { TestBed } from '@angular/core/testing';

import { MealSearchService } from './meal-search.service';

describe('MealSearchService', () => {
  let service: MealSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
