import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: Array<Date>, rowSize: number): any {
    const calendarDays: Array<Array<Date>> = [];
    let row: Array<Date> = [];

    calendarDaysArray.map((day: Date, index: number) => {
      row.push(day);
      if (++index % rowSize  === 0) {
        calendarDays.push(row);
        row = [];
      }
    });
    return calendarDays;
  }
}
