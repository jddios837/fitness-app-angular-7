import { Component, OnInit, OnDestroy } from '@angular/core';

import { WorkoutsService, Workout } from "../../../shared/services/workouts/workouts.service";
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';

@Component({
  selector: 'app-workouts',
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="assets/img/food.svg" alt="">
          Tus Ejercicios
        </h1>
        <a 
          class="btn__add"
          [routerLink]="['../workouts/new']">
          <img src="assets/img/add-white.svg" alt="">
          Agregar un Ejercicio
        </a>
      </div>
      <div *ngIf="workouts$ | async as workouts; else loading;">
        <div class="message" *ngIf="!workouts.length">
          <img src="assets/img/face.svg">
          No hay ejercicios, agregar un nuevo ejercicio para comenzar
        </div>
        <list-item
          *ngFor="let workout of workouts"
          [item]="workout"
          (remove)="removeWorkout($event)">
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg">
          Cargando ejercicios...
        </div>
      </ng-template>
      
    </div>
  `,
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');

    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.id);
  }

}
