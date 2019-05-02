import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { ListItemComponent } from './components/list-item/list-item.component';

// Services
import { MealsService } from "./services/meals/meals.service";
import { WorkoutsService } from "./services/workouts/workouts.service";
import { ScheduleService } from "./services/schedule/schedule.service";

// Pipes
import { JoinPipe } from "./pipes/join.pipe";
import { WorkoutPipe } from "./pipes/workout.pipe";

@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularFirestoreModule
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    }
  }
}
