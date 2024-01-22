import { Component } from '@angular/core';
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
  categories: Category[];
  meals: Meal[];
  cols: number;
  selectedCategory: string;
  searchCtrl: FormControl;

  constructor(
    private categoryService: CategoryService,
    private mealSearchService: MealSearchService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.selectedCategory = '';
    this.cols = 2;
    this.categories = [];
    this.meals = [];
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
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 2;
        } else {
          this.cols = 4;
        }
      });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;

      console.log(this.categories);
    });
  }

  onSearch(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (value) {
      this.mealSearchService.searchMeal(value).subscribe((meals) => {
        this.selectedCategory = '';
        this.meals = meals;
      });
    } else {
      this.meals = [];
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.searchCtrl.setValue('');
    if (category) {
      this.categoryService.getMealsByCategory(category).subscribe((meals) => {
        this.meals = meals;
      });
    } else {
      this.meals = [];
    }
  }

  onDetails(id: string) {
    console.log(id);
    this.router.navigate(['/details', id]);
  }
}
