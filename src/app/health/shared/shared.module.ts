import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { MealsService } from "./services/meals/meals.service";
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [
    ListItemComponent
  ],
  exports: [
    ListItemComponent
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
        MealsService
      ]
    }
  }
}
