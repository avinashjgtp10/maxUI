import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ChartCalculationsService {

  constructor() { }

  getCalculatedChartData(data,segment,range=7) {
    return new Promise((resolve, reject) => {
      let days = [];
      let formattedDays = [];
      let returvArr = Array(range);
      returvArr.fill(0);
      let today = moment();
      for (var i = 0; i < range; i++) {
        days.push(today.clone().subtract(i, 'day').format('DD/MM/YYYY'));
        formattedDays.push(today.clone().subtract(i, 'day').format('dd/DD'));
      }
      console.log('segment',segment);
      console.log('days',days);
      console.log('formattedDays',formattedDays);
      console.log('data',data);
      if(segment === 'all_meals') {
        data.forEach(element => {
            if(days.includes(element.date)){
             let index = days.indexOf(element.date);
             if(returvArr[index]) {
              returvArr[index] = returvArr[index] + parseInt(element.c_calories);
              console.log('returvArr1[index]',returvArr[index]);
             }else {
              returvArr[index] = parseInt(element.c_calories);
              console.log('returvArr2[index]',returvArr[index]);
             }
            }
        });
      } else {
        data.forEach(element => {
          if(element.consumed_category === segment){
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
      }
      let resultdata = {
        legends: days.reverse(),
        formattedLegends: formattedDays.reverse(),
        data: returvArr.reverse()
      }
      resolve(resultdata);
    });
    
  }
}
