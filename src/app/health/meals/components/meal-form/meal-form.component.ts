import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meal-form">
        <form [formGroup]="form">
          <div class="meal-form__name">
            <label>
              <h3>Meal name</h3> 
              <input 
                type="text"
                placeholder="ej. Desayuno Libiano"
                formControlName="name">
            </label>
          </div>
          
          <div class="meal-form__food">
            <div class="meal-form__subtitle">
              <h3>Food</h3>
              <button 
                type="button"
                class="meal-form__add">
                <img src="assets/img/add-white.svg">
                Add food 
              </button>
            </div>
            <div formArrayName="ingredients">
              <label *ngForm="let c of ingredients.controls; index as i;"></label>
            </div>
          </div>

          <div class="meal-form__submit">
            <div>
              <button 
                class="button" 
                type="button" 
                (click)="createMeal()">
                Crear comida
              </button>
              <a 
                class="button button--cancel"
                [routerLink]="['../']">
                Cancel
              </a>
            </div>
          </div>
        </form>
    </div>
  `,
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent  {

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(
    private fb: FormBuilder
  ) { }

  createMeal() {
    console.log(this.form.value);
    
  }

}
