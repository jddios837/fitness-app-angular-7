import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { Workout, WorkoutsService } from "src/app/health/shared/services/workouts/workouts.service";


@Component({
  selector: 'workout',
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="assets/img/workout.svg">
          <span *ngIf="workout$ | async as workout; else title;">
            {{ workout.name ? 'Editar' : 'Crear' }} Rutina de Ejercicio
          </span>
          <ng-template #title>
            Cargando...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading;">
        <workout-form 
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)">
        </workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg">
          Cargando Rutina de Ejericio...
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();

    this.workout$ = this.route.params.pipe(
      switchMap(param => this.workoutsService.getWorkout(param.id))
    )
  }

  ngOnDestroy() {

  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateMeal(event: Workout) {
    const id = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(id, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const id = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(id);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

}
