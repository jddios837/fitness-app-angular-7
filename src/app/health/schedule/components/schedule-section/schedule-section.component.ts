import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="schedule-section">
      <div class="schedule-section__bar">
        {{ name }}
      </div>

      <div>
        <div
          class="schedule-section__item food"
          *ngIf="section.meals; else addMeal"
          (click)="onSelect('meals', section.meals)">
          <span>{{ section.meals | join }}</span>
        </div>
        
        <ng-template #addMeal>
          <div
            class="schedule-section__item"
            (click)="onSelect('meals')">
            Asignar Comida
          </div>
        </ng-template>
        

        <!-- Workout -->
        <div
          class="schedule-section__item workout"
          *ngIf="section.meals; else addWorkout"
          (click)="onSelect('meals', section.workouts)">
          <span>{{ section.workouts | join }}</span>
        </div>
        
        <ng-template #addWorkout>
          <div
            class="schedule-section__item"
            (click)="onSelect('workouts')">
            Asignar Ejercicio
          </div>
        </ng-template>

      </div>
    </div>
  `,
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnInit {

  @Input()
  name: string

  @Input()
  section: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    })
  }

}
