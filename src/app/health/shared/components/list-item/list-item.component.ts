import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{item.name}}</p>
        <p class="list-item__ingredients">
          <span *ngIf="item.ingredients; else showWorkout; ">
            {{ item.ingredients | join }}
          </span>
        </p>
        <ng-template #showWorkout> 
          <span>{{ item | workout }}</span>
        </ng-template>
        
      </a>

      <div *ngIf="toggled" class="list-item__delete">
        <p>¿Vas a liminarlo?</p>
        <button
          class="confirm"
          type="button"
          (click)="removeItem()">
          Si
        </button>
        <button
          class="confirm"
          type="button"
          (click)="toggle()">
          No
        </button>
      </div>

      <button 
        class="trash"
        type="button"
        (click)="toggle()">
        <img src="assets/img/remove.svg">
      </button>
    </div>
  `,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  toggled: boolean = false;

  @Input() item: any;

  @Output() remove = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getRoute(item: any) {
    return [
      `../${ item.ingredients ? 'meals' : 'workouts' }`, 
      item.id
    ]
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item)
  }
}
