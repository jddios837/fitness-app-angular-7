import { Component, OnInit } from '@angular/core';

import { Meal, MealsService } from "src/app/health/shared/services/meals/meals.service";
import { Router } from '@angular/router';

@Component({
  selector: 'meal',
  template: `
    <div class="meal">
      <div class="meal_title">
        <h1>
          <img src="assets/img/food.svg" alt="">
          <span>Crear Comida</span>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)">
        </meal-form>
      </div>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  constructor(
    private mealsService: MealsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    // redirect
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

}
