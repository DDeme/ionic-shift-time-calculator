import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-remaining',
  templateUrl: './time-remaining.component.html',
  styleUrls: ['./time-remaining.component.scss'],
})
export class TimeRemainingComponent implements OnInit {
  
  
  constructor() { }

  @Input() start: string;
  @Input() end: string;
  
  percentage = 0;
  timeRemaning = 0;
  private static calculatePrecentage = (timeRemaning, period) => {
    return (period - timeRemaning) / period
  }

  refresh() {
    this.refreshPercentage()
  }

  refreshPercentage() {
    const start: number = moment(this.start, "HH:mm").unix()
    const end: number = moment(this.end, "HH:mm").unix()

    const period: number = end - start
    this.timeRemaning = end - moment().unix() 
    this.percentage = TimeRemainingComponent.calculatePrecentage(this.timeRemaning, period)
  }

  ngOnInit() {
    this.refreshPercentage()
    setInterval(() => this.refresh(), 1000);
  }
  ngOnChanges() {
    this.refreshPercentage()
  }
}
