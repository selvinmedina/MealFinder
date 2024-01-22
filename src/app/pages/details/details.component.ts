import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealDetail } from '../../models/meal-detail.model';
import { MealDetailService } from '../../services/meal-detail.service';
// mat-card-subtitle
import { MatCardModule } from '@angular/material/card';
// mat-chip-list
import { MatChipsModule } from '@angular/material/chips';
import { Ingredient } from '../../models/ingredient.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  id: string | null;
  meal: MealDetail | null;

  constructor(
    private route: ActivatedRoute,
    private mealDetailService: MealDetailService
  ) {
    this.id = null;
    this.meal = null;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.getMealDetail();
    });
  }

  private getMealDetail() {
    if (this.id) {
      this.mealDetailService.getMealById(this.id).subscribe((meal) => {
        this.meal = meal;

        console.log(this.meal);
      });
    }
  }

  getIngredients(meal: MealDetail | null): Ingredient[] {
    if (!meal) {
      return [];
    }

    const ingredients = <Ingredient[]>[];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = meal[`strIngredient${i}`];
      const ingredientMeasure = meal[`strMeasure${i}`];
      if (ingredientName) {
        ingredients.push(<Ingredient>{
          name: ingredientName,
          measure: ingredientMeasure,
        });
      }
    }
    return ingredients;
  }

  getIngredientImageUrl(ingredient: string): string {
    return `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
  }
}
