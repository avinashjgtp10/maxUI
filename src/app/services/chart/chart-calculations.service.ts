import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ChartCalculationsService {

  constructor() { }

  getCalculatedChartData(data,segment, range=7) {
    return new Promise((resolve, reject) => {
      var days = [];
      let returvArr = Array(range);
      returvArr.fill(0);
      let today = moment();
      for (var i = 0; i < range; i++) {
        days.push(today.clone().subtract(i, 'day').format('DD/MM/YYYY'));
      }
      data.forEach(element => {
        if(element.c_category.includes(segment)){
          if(days.includes(element.date)){
           let index = days.indexOf(element.date);
           if(returvArr[index]) {
            returvArr[index] = returvArr[index] + parseInt(element.c_calories);
           }else {
            returvArr[index] = parseInt(element.c_calories);
           }
          }
        }
      });
      let resultdata = {
        legends: days.reverse(),
        data: returvArr.reverse()
      }
      resolve(resultdata);
    });
    
  }
}
