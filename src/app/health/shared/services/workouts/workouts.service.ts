import { Injectable } from '@angular/core';
import { Store } from 'src/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable } from 'rxjs';

import { tap, map, filter } from 'rxjs/operators';
import { of } from 'rxjs'

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  id: string,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  getWorkout(id: string) {
    if (!id) return of({});

    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map(workouts => workouts.find((workout: Workout) => workout.id === id))
    )
  }

  workouts$: Observable<any> = this.db.collection(`workouts`, ref => ref.where('uid', '==', this.uid)).snapshotChanges()
    .pipe(
      map(
        (action) => {
            let result = action.map( a => {
              return {...a.payload.doc.data(),
                id: a.payload.doc.id
              };
            });
            this.store.set('workouts', result)  
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

  addWorkout(workout: Workout) {
    this.db.collection(`workouts`).add({uid: this.uid, ...workout});
  }

  updateWorkout(id: string, workout: Workout) {
    this.db.collection(`workouts`, ref => ref.where('uid', '==', this.uid)).doc(id).update(workout);
  }

  removeWorkout(id: string) {
    return this.db.doc(`workouts/${id}`).delete();
  }
}
