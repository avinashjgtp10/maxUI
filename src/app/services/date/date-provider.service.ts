import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DateProviderService {

  constructor() { }

  getTwoWeekDates(weekRange = -1) {
    return new Promise((resolve, reject) => {
      var weekStart = moment().add(weekRange, 'weeks').startOf('week');
      var days = [];
      let today = moment().format('dd/DD');
      for (var i = 0; i < 14; i++) {
        days.push(weekStart.clone().add(i, 'day').format('dd/DD'));
      }
      const weekData = days.map((v,i,a)=>{
        let date = v.split('/');
        if(moment(v).isSame(today)) {
          return {
            day:date[0],
            date: date[1],
            index:i,
            isToday:true,
            isSelected:true
          }
        } else {
          return {
            day:date[0],
            date: date[1],
            index:i,
            isToday:false,
            isSelected:false
          }
        }
      });
      resolve(weekData);
    });
    
  }
}
