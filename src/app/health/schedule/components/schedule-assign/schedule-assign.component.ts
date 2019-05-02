import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="schedule-assign">
  
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="assets/img/{{ section.type === 'workouts' ? 'workout' : 'food'  }}.svg">
            Asigna {{ section.type}}
          </h1>

          <a class="btn__add"
              [routerLink]='getRoute(section.type)'>
            <img src="assets/img/add-white.svg">
            Nuevo {{ section.type }}
          </a>
        </div>

        <div class="schedule-assign__list">
          <span
            class="schedule-assign__empty"
            *ngIf="!list?.length">
            <img src="assets/img/face.svg">
            Nada que asignar
          </span>
          
          <div
            *ngFor="let item of list"
            [class.active]="exist(item.name)"
            (click)="toggleItem(item.name)">
            {{ item.name }}
          </div>
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button 
              type="button"
              class="button"
              (click)="updateAssign()">
              Update
            </button>
            <button 
              type="button"
              class="button button--cancel"
              (click)="cancelAssign()">
              Cancelar
            </button>
          </div>
        </div>

      </div>

    </div>
  `,
  styleUrls: ['./schedule-assign.component.scss']
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }
  
  getRoute(name: String) {
    return [`../${name}/new`];
  }

  exist(name: string) {
    return !!~this.selected.indexOf(name);
  }

  toggleItem(name: string) {
    if (this.exist(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name]; 
    }
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign() {
    this.cancel.emit();
  }

  

}
