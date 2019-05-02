import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'join'})
export class JoinPipe implements PipeTransform {
	transform(value: any) {
		console.log('Value Join ', value);
		
		return Array.isArray(value) ? value.join(', ') : value
	}
}