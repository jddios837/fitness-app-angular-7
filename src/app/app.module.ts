import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./containers/app/app.component";

import { Store } from "../store";

//feature modules
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";

// components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HealthModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNY3obrVoUUYb4lOoBvLIjn7RvKGqV4hw",
    authDomain: "fitness-app-7a9f6.firebaseapp.com",
    databaseURL: "https://fitness-app-7a9f6.firebaseio.com",
    projectId: "fitness-app-7a9f6",
    storageBucket: "fitness-app-7a9f6.appspot.com",
    messagingSenderId: "943063535694"
  };
  firebase.initializeApp(config);

*/
