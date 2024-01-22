import { Component, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Meal } from '../../models/meal.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MealSearchService } from '../../services/meal-search.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  categories = signal<Category[]>([]);
  meals = signal<Meal[]>([]);
  cols = signal<number>(2);
  selectedCategory = signal<string>('');
  searchCtrl: FormControl;

  constructor(
    private categoryService: CategoryService,
    private mealSearchService: MealSearchService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.searchCtrl = new FormControl();
  }

  ngOnInit() {
    this.configureBreakpointObserver();
    this.getCategories();
  }

  private configureBreakpointObserver() {
    this.breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols.set(1);
        } else if (result.breakpoints[Breakpoints.TabletPortrait]) {
          this.cols.set(2);
        } else {
          this.cols.set(4);
        }
      });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories.set(response);

      console.log(this.categories);
    });
  }

  onSearch(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      this.mealSearchService.searchMeal(value).subscribe((meals) => {
        this.selectedCategory.set('');
        this.meals.set(meals);
      });
    } else {
      this.meals.set([]);
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory.set(category);
    this.searchCtrl.setValue('');
    if (category) {
      this.categoryService.getMealsByCategory(category).subscribe((meals) => {
        this.meals.set(meals);
      });
    } else {
      this.meals.set([]);
    }
  }

  onDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
