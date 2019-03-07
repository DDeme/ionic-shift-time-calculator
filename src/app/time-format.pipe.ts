import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeFormat'
})

export class TimeFormatPipe implements PipeTransform {
  transform(value: any): string {

    const duration = moment.duration(value, 'seconds')
    const hours = this.addLeadingZero(duration.hours())
    const minutes = this.addLeadingZero(duration.minutes())
    const seconds = this.addLeadingZero(duration.seconds())
            
    return `${hours}:${minutes}:${seconds}`;
  }

  private addLeadingZero(value: number): string {
    let stringValue = value.toString()

    if (stringValue.length === 1) {
      stringValue = `0${stringValue}`
    }
    
    return stringValue
  }

}
