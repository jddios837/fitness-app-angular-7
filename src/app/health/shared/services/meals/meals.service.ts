import { Injectable } from '@angular/core';
import { Store } from 'src/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  // meals$: Observable<any> = this.db.collection(`meals/${this.uid}`).valueChanges()
  meals$: Observable<any> = this.db.collection(`meals`).valueChanges()
    .pipe(
      tap(next => this.store.set('meals', next))
    );

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }
}
