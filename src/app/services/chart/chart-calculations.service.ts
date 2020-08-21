import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ApiCallService } from "../../services/api/api-call.service";

@Injectable({
  providedIn: 'root'
})
export class ChartCalculationsService {

  constructor(public apiService: ApiCallService) { }

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

  getHandWashChartData(dateArray){
    let yLabelAchived = Array(dateArray.length);
    yLabelAchived.fill(0);
    let yLabelGoal = Array(dateArray.length);
    yLabelGoal.fill(0);
    yLabelAchived = dateArray.map((x,i,a)=>{
      return {
        label: x.ht_date_graphFormat,
        y: x.ht_achived,
        x: i,
        date: x.ht_date
      }
    });
    yLabelGoal = dateArray.map((x,i,a)=>{
      return {
        label: x.ht_date_graphFormat,
        y: x.ht_goal,
        x: i,
        date: x.ht_date
      }
    });
    return new Promise((resolve, reject) => {
      let data = {
        to_date: dateArray[0].ht_date,
        from_date: dateArray[dateArray.length-1].ht_date,
        ht_cid: localStorage.getItem('c_id')
      }
      this.apiService.searchHandwashTrackerData(data).subscribe((userHandWashData:any)=>{
        let handwashDataEnterd = userHandWashData.date;
       for(let i = 0; i<dateArray.length; i++){
         for(let j = 0; j<handwashDataEnterd.length; j++){
          if(dateArray[i].ht_date === handwashDataEnterd[j].ht_date){
            dateArray[i].ht_goal = parseInt(handwashDataEnterd[j].ht_goal);
            dateArray[i].ht_achived = parseInt(handwashDataEnterd[j].ht_achived);
            yLabelAchived[i].y = parseInt(handwashDataEnterd[j].ht_achived);
            yLabelGoal[i].y = parseInt(handwashDataEnterd[j].ht_goal);
          }
         }
       }
      let i,j,temparray1,temparray2,temparray3,chunk = 7;
      let resultArr = []; 
      let yAc = [];
      let yGo = [];
      for (i=0,j=dateArray.length; i<j; i+=chunk) {
          temparray1 = dateArray.slice(i,i+chunk);
          resultArr.push(temparray1);
          temparray2 = yLabelAchived.slice(i,i+chunk);
          yAc.push(temparray2);
          temparray3 = yLabelGoal.slice(i,i+chunk);
          yGo.push(temparray3);
      }
      resultArr = resultArr;
      yAc = yAc.reverse();
      yGo = yGo.reverse();
      let resultObj = {
        resultArr,yAc,yGo
      }
      resolve(resultObj);
      },(error)=>{

      });
    });
  }
}
