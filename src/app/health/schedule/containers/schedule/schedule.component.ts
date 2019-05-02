import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from "src/store";

import { ScheduleService, ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule',
  template: `
    <div class="schedule">
      
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()">
      </schedule-assign>

      
    </div>
  `,
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;


  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealService: MealsService,
    private workoutService: WorkoutsService
  ) { }

  

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe()
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    
    this.closeAssign();    
  }

  closeAssign() {
    this.open = false;
  }


}
