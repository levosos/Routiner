import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds'
})
export class SecondsPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - (hours * 3600)) / 60);
    const seconds = value - (hours * 3600) - (minutes * 60);

    return ('0' + hours).slice(-2) +
      ':' +
      ('0' + minutes).slice(-2) +
      ':' +
      ('0' + seconds).slice(-2);
  }
}
