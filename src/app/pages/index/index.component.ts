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

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  categories: Category[];
  meals: Meal[];
  cols: number;

  constructor(
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.cols = 2;
    this.categories = [];
    this.meals = [];
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
      this.categoryService.getMealsByCategory(value).subscribe((meals) => {
        this.meals = meals;
      });
    } else {
      this.meals = [];
    }
  }

  onCategorySelect(category: string) {
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
