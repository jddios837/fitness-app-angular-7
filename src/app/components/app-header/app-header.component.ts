import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { User } from "../../auth/shared/services/auth/auth.service";

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="assets/img/logo.svg" alt="">
        <div 
          class="app-header__user-info"
          *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div> 
  `,
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  @Input() user: User;

  @Output() logout = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  logoutUser() {
    this.logout.emit();
  }

}
