import { TestBed } from '@angular/core/testing';

import { MealDetailService } from './meal-detail.service';

describe('MealDetailService', () => {
  let service: MealDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
