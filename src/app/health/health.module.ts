import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/shared/guards/auth.guard";

import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HealthModule { }
