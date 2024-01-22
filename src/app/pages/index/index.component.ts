import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  category: Category[];

  constructor(private categoryService: CategoryService) {
    this.category = [];
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((response) => {
      this.category = response;

      console.log(this.category);
    });
  }
}
