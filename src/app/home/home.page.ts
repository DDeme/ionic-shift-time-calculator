import { Component } from '@angular/core';
import { DeprecatedCurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { TimeDiff } from './timediff'

const BREAK_TIME = 30 * 60
const WORKING_SHIPFT = 8 * 60 * 60;

const generateOptions = (start = 0, end = 0, step = 0): number[] => {
  if (start === end && step === 0) {
    return [];
  }

  let arr = []
  let value = start

  while(value <= end) {
    arr.push(value)
    value += step;
  }

  return arr;
}

const tranformToUnix = (time, operation = 1) => operation * moment(time).unix()  

const getDefaultTime = (hour = 0, minute = 0, second = 0) => moment().hour(hour).minute(minute).second(second).format("HH:mm")

const getDefaultInputValues = () => {
  return {
    timeDefficit: {
      operation: 1,
      time: getDefaultTime(),
    },
    timeTarget: {
      operation: 1,
      time: getDefaultTime(),
    },
    startDate: getDefaultTime(8),
    endDate: null,
  }
}

const getRecomendedDeparture = (start, deficit, lunch_break = BREAK_TIME): number => start - ( deficit ) + lunch_break + WORKING_SHIPFT
const getCaluculatedDeparture = (start, end, deficit, target_deficit, lunch_break = BREAK_TIME): number => start - ( deficit ) + ( target_deficit  ) + lunch_break + WORKING_SHIPFT

const pickerToUnix = (date, toRelative = false) => toRelative ? toRelativeUnix(moment(date, "HH:mm")) : moment(date, "HH:mm").unix()

const toUnix = (hours = 0, minutes = 0, seconds = 0) => hours * 60 * 60 + minutes * 60 + seconds

const toRelativeUnix = momentDate => toUnix(momentDate.hour(), momentDate.minute())


const calculate = (input): any => {
 
  const deficit = input.timeDefficit.operation * pickerToUnix(input.timeDefficit.time, true)
  const target_deficit = input.timeTarget.operation * pickerToUnix(input.timeTarget.time, true) 
  const start = pickerToUnix(input.startDate) 
  const recommnededDeparture = getRecomendedDeparture(start, deficit)
  const end = input.endDate ? pickerToUnix(input.endDate) : recommnededDeparture 
  
  const caluculatedDeparture = input.endDate ? end : getCaluculatedDeparture(start, end, deficit, target_deficit)

  const expected_deficit = input.endDate ? end - (start + WORKING_SHIPFT + BREAK_TIME) : target_deficit;

 


  return {
      deficit: TimeDiff.toString(expected_deficit, true),
      recommnededDeparture: TimeDiff.toString(recommnededDeparture),
      calculatedDeparture: TimeDiff.toString(caluculatedDeparture),
  }
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hoursOptions = generateOptions(0, 5, 1);
  minutesOptions = generateOptions(0, 55, 5);
  time = [ { label: "+ (overtime)", value:1, selected: true}, { label: "- (deficit)", value:-1, selected: false}];
  input = getDefaultInputValues();

  report = {
    deficit: '',
    recommnededDeparture: '',
    calculatedDeparture: '',
    period: 0,
    timeRemaning: 0,
  }

  generateReport(): void {
    this.report = calculate(this.input);
  }

  resetForm(): void {
    this.input = getDefaultInputValues();
    this.generateReport();
  }

  ngOnInit() { 
    this.resetForm()
  }
}
