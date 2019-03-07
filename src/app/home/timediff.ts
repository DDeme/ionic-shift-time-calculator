import * as moment from 'moment';


const BREAK_TIME = 30 * 60
const WORKING_SHIPFT = 8 * 60 * 60;

export class TimeDiff {
    static total_time(start: number, end: number , breakTime = BREAK_TIME): number {
        return end - start - breakTime
    }


    static remaning(start: number, end: number , breakTime = BREAK_TIME, shiftTime = WORKING_SHIPFT): number {
        return TimeDiff.total_time(start, end, breakTime) - shiftTime
    }

    static toString(unix: number, withPrefix = false): string {
        if (unix === 0) {
            return `0`
        } 
        
        
        let prefix = '';
        if (unix < 0) {
            prefix = '-'
        } else if (unix > 0) {
            prefix = '+'
        }

        if (withPrefix === false) {
            prefix = '';
        }

        return `${prefix} ${moment.unix(unix).format("HH:mm")}`
    }

    static fromToday(hour: number): number {
        return moment(hour, "H").unix();
    }

}

