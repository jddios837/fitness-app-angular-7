import { Component, OnInit, OnDestroy } from '@angular/core';

import { MealsService, Meal } from "../../../shared/services/meals/meals.service";
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';

@Component({
  selector: 'app-meals',
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/img/food.svg" alt="">
          Tus Comidas
        </h1>
        <a 
          class="meal__add"
          [routerLink]="['../meals/new']">
          <img src="assets/img/add-white.svg" alt="">
          Agregar una Comida
        </a>
      </div>
      <div *ngIf="meals$ | async as meals; else loading;">
        <div class="message" *ngIf="!meals.length">
          <img src="assets/img/face.svg">
          No hay comidas, agregar una nueva comida para comenzar
        </div>
        <list-item
          *ngFor="let meal of meals"
          [item]="meal"
          (remove)="removeMeal($event)">
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg">
          Cargando comidas...
        </div>
      </ng-template>
      
    </div>
  `,
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) { }

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');

    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event.id);
  }

}
