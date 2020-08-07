import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DateProviderService {

  constructor() { }
  isToday(date){
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  };
  getTwoWeekDates(weekRange = -1) {
    return new Promise((resolve, reject) => {
      var weekStart = moment().add(weekRange, 'weeks').startOf('week');
      var days = [];
      let today = moment().toDate();
      for (var i = 0; i < 14; i++) {
        days.push(weekStart.clone().add(i, 'day').toDate());
      }
      const weekData = days.map((v,i,a)=>{
        var temp = moment(v).format('dd/DD');
        var date = temp.split('/');
        if(this.isToday(v)) {
          return {
            day:date[0],
            date: date[1],
            dateFormatted: moment(v).format('DD/MM/YYYY'),
            fullDate: v,
            index:i,
            isToday:true,
            isSelected:true
          }
        } else {
          return {
            day:date[0],
            date: date[1],
            dateFormatted: moment(v).format('DD/MM/YYYY'),
            fullDate: v,
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
