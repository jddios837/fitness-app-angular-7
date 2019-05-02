import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="days">
      <button 
        type="button" 
        class="day" 
        *ngFor="let day of days; index as i"
        (click)="selectDay(i)">
        <span [class.active]="i === selected">
          {{ day }}
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent implements OnInit {
  days = [ 'L', 'M', 'Mi' , 'J', 'V', 'S' , 'D']

  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>();

  selectDay(index: number) {
    this.select.emit(index);
  }


  constructor() { }

  ngOnInit() {
  }

}
