import { Component, OnChanges, ChangeDetectionStrategy, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="workout-form">
        <form [formGroup]="form">
          <div class="workout-form__name">
            <label>
              <h3>Nombre del ejercicio fisico</h3> 
              <input 
                type="text"
                [placeholder]="placeholder"
                formControlName="name">
              <div class="error" *ngIf="required">
                El nombre del ejercicio es requerido
              </div>  
            </label>
            <label for="">
              <h3>Type</h3>
              <workout-type formControlName="type">
              </workout-type>
            </label>
          </div>

          <div class="workout-form__fields">

            <div *ngIf="form.get('type').value === 'strength'">
              <div 
                class="workout-form__fields"
                formGroupName="strength">
                <label>
                  <h3>Repeticiones</h3>
                  <input type="number" formControlName="reps">
                </label>

                <label>
                  <h3>Series</h3>
                  <input type="number" formControlName="sets">
                </label>

                <label>
                  <h3>Weight <span>(kg)</span></h3>
                  <input type="number" formControlName="weight">
                </label> 
              </div>
            </div>


            <div *ngIf="form.get('type').value === 'endurance'">
              <div
                class="workout-form__fields"
                formGroupName="endurance">

                <label>
                  <h3>Distance <span>(km)</span></h3>
                  <input type="number" formControlName="distance">
                </label>

                <label>
                  <h3>Duration <span>(minutos)</span></h3>
                  <input type="number" formControlName="duration">
                </label>
              </div>

            </div>

          </div>

          <div class="workout-form__submit">
            <div>
              <button 
                class="button" 
                type="button" 
                *ngIf="!exists"
                (click)="createWorkout()">
                Crear
              </button>
              <button 
                class="button" 
                type="button"
                *ngIf="exists"
                (click)="updateWorkout()">
                Guardar
              </button>
              <a 
                class="button button--cancel"
                [routerLink]="['../']">
                Cancel
              </a>
            </div>

            <div class="workout-form__delete" *ngIf="exists">
              <div *ngIf="toggled">
                <p>¿Vas a liminarlo?</p>
                <button
                  class="confirm"
                  type="button"
                  (click)="removeWorkout()">
                  Si
                </button>
                <button
                  class="confirm"
                  type="button"
                  (click)="toggle()">
                  No
                </button>
              </div>
        
              <button class="button button--delete" type="button" (click)="toggle()">
                Delete
              </button>
            </div>
          </div>
        </form>
    </div>
  `,
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnChanges  {

  toggled = false;
  exists  = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  })

  constructor(
    private fb: FormBuilder
  ) { }

  get placeholder() {
    return `e.g ${this.form.get('type').value === 'strength' ? 'Press de Hombro' : 'Trotar' }`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.workout && this.workout.name) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value); 
    }
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
  
  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
