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
      let calorieConsumed = 0;
      let fatConsumed = 0;
      let fiberConsumed = 0;
      let proteinsConsumed = 0;
      let carbsConsumed = 0;
      let returvArr = Array(range);
      returvArr.fill(0);
      let proteinArr = Array(range);
      proteinArr.fill(0);
      let fatsArray = Array(range);
      fatsArray.fill(0);
      let carbsArray = Array(range);
      carbsArray.fill(0);
      let fiberArray = Array(range);
      fiberArray.fill(0);
      let today = moment();
      for (var i = 0; i < range; i++) {
        days.push(today.clone().subtract(i, 'day').format('DD/MM/YYYY'));
        formattedDays.push(today.clone().subtract(i, 'day').format('dd/DD'));
      }
      console.log('segment',segment);
      console.log('formattedDays',formattedDays);
      console.log('data',data);
      if(segment === 'all_meals') {
        data.forEach(element => {
            if(days.includes(element.date)){
             let index = days.indexOf(element.date);
             if(returvArr[index]) {
              returvArr[index] = returvArr[index] + parseFloat(element.c_calories);
             }else {
              returvArr[index] = parseFloat(element.c_calories);
             }
             if(proteinArr[index]) {
              proteinArr[index] = proteinArr[index] + parseFloat(element.c_proteins);
             }else {
              proteinArr[index] = parseFloat(element.c_proteins);
             }
             if(fatsArray[index]) {
              fatsArray[index] = fatsArray[index] + parseFloat(element.c_fats);
             }else {
              fatsArray[index] = parseFloat(element.c_fats);
             }
             if(carbsArray[index]) {
              carbsArray[index] = carbsArray[index] + parseFloat(element.c_carbohydrates);
             }else {
              carbsArray[index] = parseFloat(element.c_carbohydrates);
             }
             if(fiberArray[index]) {
              fiberArray[index] = fiberArray[index] + parseFloat(element.c_fibres);
             }else {
              fiberArray[index] = parseFloat(element.c_fibres);
             }
            }
        });
      } else {
        data.forEach(element => {
          if(element.consumed_category === segment){
            if(days.includes(element.date)){
             let index = days.indexOf(element.date);
             if(returvArr[index]) {
              returvArr[index] = returvArr[index] + parseFloat(element.c_calories);
             }else {
              returvArr[index] = parseFloat(element.c_calories);
             }
             if(proteinArr[index]) {
              proteinArr[index] = proteinArr[index] + parseFloat(element.c_proteins);
             }else {
              proteinArr[index] = parseFloat(element.c_proteins);
             }
             if(fatsArray[index]) {
              fatsArray[index] = fatsArray[index] + parseFloat(element.c_fats);
             }else {
              fatsArray[index] = parseFloat(element.c_fats);
             }
             if(carbsArray[index]) {
              carbsArray[index] = carbsArray[index] + parseFloat(element.c_carbohydrates);
             }else {
              carbsArray[index] = parseFloat(element.c_carbohydrates);
             }
             if(fiberArray[index]) {
              fiberArray[index] = fiberArray[index] + parseFloat(element.c_fibres);
             }else {
              fiberArray[index] = parseFloat(element.c_fibres);
             }
            }
          }
        });
      }
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      calorieConsumed = returvArr.reduce(reducer);
      fatConsumed = fatsArray.reduce(reducer);
      carbsConsumed = carbsArray.reduce(reducer);
      proteinsConsumed = carbsArray.reduce(reducer);
      fiberConsumed = fiberArray.reduce(reducer);
      let resultdata = {
        legends: days.reverse(),
        formattedLegends: formattedDays.reverse(),
        data: returvArr.reverse(),
        fiberArray: fiberArray.reverse(),
        proteins: proteinArr.reverse(),
        fats: fatsArray.reverse(),
        carbsArray: carbsArray.reverse(),
        calorieConsumed: calorieConsumed, 
        fatConsumed:fatConsumed,
        carbsConsumed:carbsConsumed,
        proteinsConsumed:proteinsConsumed,
        fiberConsumed:fiberConsumed
      }
      resolve(resultdata);
    });
    
  }
}
