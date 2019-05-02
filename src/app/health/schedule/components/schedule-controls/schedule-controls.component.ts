import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, Output } from '@angular/core';

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="controls">
      
      <button 
        type="button"
        (click)="movaDate(offset - 1)">
        <img src="assets/img/chevron-left.svg">
      </button>

      <p>{{ selected | date:'d MMMM y'}}</p>

      <button 
        type="button"
        (click)="movaDate(offset + 1)">
        <img src="assets/img/chevron-right.svg">
      </button>

    </div>
  `,
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent implements OnInit {

  offset = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  movaDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }

}
