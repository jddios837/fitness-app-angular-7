import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { RegisterComponent } from "./containers/register/register.component";

export const ROUTES: Routes = [
  { 
    path: '', component: RegisterComponent,
    // path: 'auth',
    // children: [
    //   { path: '', pathMatch: 'full', redirectTo: 'login' },
    //   { path: 'login', loadChildren: './login/login.module#LoginModule' },   
    //   { path: 'register', loadChildren: './register/register.module#RegisterModule' }   
    // ]
  }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class RegisterModule { }
