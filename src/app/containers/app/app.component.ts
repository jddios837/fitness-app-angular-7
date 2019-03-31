import { Component, OnInit, OnDestroy } from '@angular/core';

// import { Observable } from "rxjs/Observable";
// import { Subscription } from "rxjs/Subscription";

import { Store } from "src/store";

import { AuthService } from "../../auth/shared/services/auth/auth.service";
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ user$ | async | json}}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Me suscribo a este Observable al momento de iniciar el 
    // componente
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
