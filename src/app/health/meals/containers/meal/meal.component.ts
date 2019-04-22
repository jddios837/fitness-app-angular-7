import { Component, OnInit, OnDestroy } from '@angular/core';

import { Meal, MealsService } from "src/app/health/shared/services/meals/meals.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'meal',
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/img/food.svg">
          <span *ngIf="meal$ | async as meal; else title;">
            {{ meal.name ? 'Editar' : 'Crear' }} Comida
          </span>
          <ng-template #title>
            Cargando...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading;">
        <meal-form 
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg">
          Cargando meal...
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();

    this.meal$ = this.route.params.pipe(
      switchMap(param => this.mealsService.getMeal(param.id))
    )
  }

  ngOnDestroy() {

  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const id = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(id, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const id = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(id);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

}
