import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'edmTimer'
})

export class TimerPipe implements PipeTransform {
    transform(timer: any): any {
        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = (timer % 3600) % 60;
        return `${ hours < 10 ? '0' + hours : hours } : ${ minutes < 10 ? '0' + minutes : minutes } : ${ seconds < 10 ? '0' + seconds : seconds }`;
    }
}