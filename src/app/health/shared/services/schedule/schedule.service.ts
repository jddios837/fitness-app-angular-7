import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from "src/store";

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { tap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { Meal } from "../meals/meals.service";
import { Workout } from "../workouts/workouts.service";

import * as firebase from 'firebase';

export interface ScheduleItem {
	meals: Meal[],
	workouts: Workout[],
	section: string,
	timestamp: number,
	id?: string
}

export interface ScheduleList {
	morning?: ScheduleItem,
	lunch?: ScheduleItem,
	evening?: ScheduleItem,
	snacks?: ScheduleItem,
	[key: string]: any
}

@Injectable()
export class ScheduleService {

	private date$ = new BehaviorSubject(new Date());
	private section$ = new Subject();
	private itemList$ = new Subject();

	items$ = this.itemList$.pipe(
		withLatestFrom(this.section$),
		map(([items, section]: any[]) => {
			

			const id = section.data.id;
			
			const time = new Date(section.day).getTime();

			const defaults: ScheduleItem = {
				workouts: null,
				meals: null,
				section: section.section,
				timestamp: time,
			}

			const payload = {
				...(id ? section.data : defaults),
				...items
			}


			if (id) {
				return this.updateSection(id, payload);
			  } else {
				return this.createSection(payload);
			  }

		})
	)
		

	selected$ = this.section$.pipe(
		tap((next: any) => this.store.set('selected', next))
	)

	list$ = this.section$.pipe(
		map((value: any) => this.store.value[value.type]),
		tap((next: any) => this.store.set('list', next))
	)

	schedule$: Observable<ScheduleList[]> = this.date$.pipe(
		tap((next: any) => this.store.set('date', next)),
		map((day: any) => {

			const startAt = (
				new Date(day.getFullYear(), day.getMonth(), day.getDate())
			).getTime();

			const endAt = (
				new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
			).getTime() -1;

			return 	 {startAt, endAt}
		}),
		switchMap(({startAt, endAt}: any) => {return this.getSchedule(startAt, endAt)}),
		map((data: any) => {

			const mapped: ScheduleList = {};

			for(const prop of data) {
				if (!mapped[prop.section]) {
					mapped[prop.section] = prop;
				}
			}

			return mapped
		}),
		tap((next: any) => this.store.set('schedule', next))
	)

	constructor(
		private store: Store,
		private db: AngularFirestore,
		private authService: AuthService
	) {}

	updateDate(date: Date) {
		this.date$.next(date);
	}

	get uid() {
		return this.authService.user.uid;
	  }

	private getSchedule(startAt: number, endAt: number) {
		return this.db.collection(
			`schedule`, 
			ref => ref.where('uid', '==', this.uid)
						.where('timestamp', '>=', startAt)
						.where('timestamp', '<=', endAt)
		).snapshotChanges().pipe(
			map(
				(data) => {
					return data.map( a => {
					  return {...a.payload.doc.data(),
						id: a.payload.doc.id
					  };
					});
					// this.store.set('meals', result)  
				}
			  )
		)
	}

	selectSection(event: any) {
		this.section$.next(event);
	}

	updateItems(items: string[]) {
		this.itemList$.next(items);
	}

	private updateSection(key: string, payload: ScheduleItem) {
		return this.db.doc('schedule/' + key).update({uid: this.uid, ...payload});
	}

	private createSection(payload: ScheduleItem) {
		const id = this.db.createId();
		this.db.collection(`schedule`).doc(id).set({id: id, uid: this.uid, ...payload});
	}
}