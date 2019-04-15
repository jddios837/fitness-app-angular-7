import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

// containers
import { ScheduleComponent } from './containers/schedule/schedule.component';

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
]

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ScheduleModule { }
