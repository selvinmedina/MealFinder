import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  categories: Category[];
  meals: Meal[];

  constructor(private categoryService: CategoryService) {
    this.categories = [];
    this.meals = [];
  }

  ngOnInit() {
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
}
