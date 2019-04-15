import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

// import { Store } from "store";
import { tap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from 'src/store';

export interface User {
	email: string,
	uid: string,
	authenticated: boolean
}

@Injectable()
export class AuthService {

	// espero si el observador authState se ejecuta al hacer login
	// en firebase, si no tiene valor, almaceno en el store null
	// para el usuario, de lo contrario asigno el valor que me retorne
	// firebase
	auth$ = this.af.authState
		.pipe(
			tap(next => {
				if (!next) {
					this.store.set('user', null);
					return;
				}

				const user: User = {
					email: next.email,
					uid: next.uid,
					authenticated: true
				}

				this.store.set('user', user);
			})
		)
		
		// .do(next => {
			
		// })

	constructor(
		private router: Router,
		private store: Store,
		private af: AngularFireAuth
	) {}

	get user() {
		return this.af.auth.currentUser;
	}

	get authState() {
		return this.af.authState;
	}

	createUser(email: string, password: string) {
		return this.af.auth
			.createUserWithEmailAndPassword(email, password);
	}

	loginUser(email: string, password: string) {
		return this.af.auth
			.signInWithEmailAndPassword(email, password);
	}

	async logoutUser() {
		await this.af.auth.signOut();
		this.router.navigate(['/auth/login']);
	}
}