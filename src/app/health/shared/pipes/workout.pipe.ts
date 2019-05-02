import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'workout'})
export class WorkoutPipe implements PipeTransform {
	transform(value: any): any {
		if (value.type === 'endurance') {
			return `
				Distancia: ${value.endurance.distance + 'km'}, 
				Duración ${ value.endurance.duration + 'mins'}
			`
		} else {
			return `
				Peso: ${value.strength.weight + 'kg'},
				Repeticiones: ${value.strength.reps},
				Series: ${value.strength.sets},

			`
		}
	}
}