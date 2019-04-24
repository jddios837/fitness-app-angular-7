import { Component, OnChanges, ChangeDetectionStrategy, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meal-form">
        <form [formGroup]="form">
          <div class="meal-form__name">
            <label>
              <h3>Nombre de la Comida</h3> 
              <input 
                type="text"
                placeholder="ej. Desayuno Libiano"
                formControlName="name">
              <div class="error" *ngIf="required">
                El nombre del plato es requerido
              </div>  
            </label>
          </div>
          
          <div class="meal-form__food">
            <div class="meal-form__subtitle">
              <h3>Ingredientes</h3>
              <button 
                type="button"
                class="meal-form__add"
                (click)="addIngredient()">
                <img src="assets/img/add-white.svg">
                 Agregar Ingrediente 
              </button>
            </div>
            <div formArrayName="ingredients">
              <label *ngFor="let c of ingredients.controls; index as i;">
                <input [formControlName]="i" placeholder="e.g. Eggs">
                <span 
                  class="meal-form__remove"
                  (click)="removeIngredient(i);">
                </span>
              </label>
            </div>
          </div>

          <div class="meal-form__submit">
            <div>
              <button 
                class="button" 
                type="button" 
                *ngIf="!exists"
                (click)="createMeal()">
                Crear
              </button>
              <button 
                class="button" 
                type="button"
                *ngIf="exists"
                (click)="updateMeal()">
                Guardar
              </button>
              <a 
                class="button button--cancel"
                [routerLink]="['../']">
                Cancel
              </a>
            </div>

            <div class="meal-form__delete" *ngIf="exists">
              <div *ngIf="toggled">
                <p>¿Vas a liminarlo?</p>
                <button
                  class="confirm"
                  type="button"
                  (click)="removeMeal()">
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
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnChanges  {

  toggled = false;
  exists  = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();
      
      const value = this.meal;
      this.form.patchValue(value); 

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
  
  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
