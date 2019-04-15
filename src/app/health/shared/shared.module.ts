import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { MealsService } from "./services/meals/meals.service";

@NgModule({
  declarations: [],
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
