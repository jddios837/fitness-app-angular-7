import { Injectable } from '@angular/core';
import { Store } from 'src/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';

import { tap, map } from 'rxjs/operators';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  id: string,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  meals$: Observable<any> = this.db.collection(`meals`, ref => ref.where('uid', '==', this.uid)).snapshotChanges()
    .pipe(
      map(
        (action) => {
            let result = action.map( a => {
              return {...a.payload.doc.data(),
                id: a.payload.doc.id
              };
            });
            this.store.set('meals', result)  
        }
      )
    );

  // meals$: Observable<any> = this.db.collection(`meals`, ref => ref.where('uid', '==', this.uid)).snapshotChanges()
  //   .pipe(
  //     tap(next => {
  //       console.log('Key', next);
        
  //       this.store.set('meals', next)
  //     })
  //   );

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    this.db.collection(`meals`).add({uid: this.uid, ...meal});
  }

  removeMeal(key: string) {
    return this.db.doc(`meals/${key}`).delete();
  }
}
