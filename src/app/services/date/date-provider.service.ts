import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ApiCallService } from "../../services/api/api-call.service";

@Injectable({
  providedIn: 'root'
})
export class DateProviderService {
  heightFtToCmRatio: number = 30.48;
  weightMultiplier: number = 10;
  heightMultiplier: number = 6.25;
  ageMultiplier: number = 5;
  maleOffset: number = 5;
  femaleOffset: number = 161;
  proteinConsumption: number = 0;
  carbsConsumption: number = 0;
  fatsConsumption: number = 0;
  fiberConsumption: number = 0;
  proteinCalc_male = {
     'weight_loss': 1,
     'weight_maintain': 0.9,
     'weight_gain': 1.1,
  }
  proteinCalc_female = {
    'weight_loss': 0.9,
    'weight_maintain': 0.8,
    'weight_gain': 1,
 }
  activityCalc_male = {
    'sedantry': 1.325,
    'moderate': 1.6,
    'high': 1.8,
  }
  activityCalc_female = {
    'sedantry': 1.2,
    'moderate': 1.5,
    'high': 1.725,
  }
  constructor(private storage: Storage, public apiService: ApiCallService) { }
  isToday(date){
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  };
  inFuture(date) {
    return date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
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
        console.log(this.inFuture(v));
        if(this.isToday(v)) {
          return {
            day:date[0],
            date: date[1],
            dateFormatted: moment(v).format('DD/MM/YYYY'),
            fullDate: v,
            index:i,
            isToday:true,
            isSelected:true,
            isDisabled: false
          }
        } else if(this.inFuture(v)){
          return {
            day:date[0],
            date: date[1],
            dateFormatted: moment(v).format('DD/MM/YYYY'),
            fullDate: v,
            index:i,
            isToday:false,
            isSelected:false,
            isDisabled: true
          }
        } else {
          return {
            day:date[0],
            date: date[1],
            dateFormatted: moment(v).format('DD/MM/YYYY'),
            fullDate: v,
            index:i,
            isToday:false,
            isSelected:false,
            isDisabled: false
          }
        }
      });
      resolve(weekData);
    });
    
  }

  getEstiamateOfCalorieConsumption() {
    return new Promise((resolve, reject) => {
      this.getUserdata().then((userData:any)=>{
       console.log('userData',userData);
       let REE;
       let totalCalorie;
       let proteinFactor;
       let activityFactor;
       let resultObj = {};
       switch(userData.gender) {
         case('male'):
         let wgCalculation_male = this.weightMultiplier * userData.weight;
         let htCalculation_male = this.heightMultiplier * userData.heightInCm;
         let ageCalculation_male = this.ageMultiplier * userData.age;
         REE = wgCalculation_male + htCalculation_male - ageCalculation_male + this.maleOffset;
         activityFactor = parseFloat(this.activityCalc_male[userData.activity] ? this.activityCalc_male[userData.activity] : 1);
         totalCalorie = REE * activityFactor;
         proteinFactor = parseFloat(this.proteinCalc_male[userData.goal] ? this.proteinCalc_male[userData.goal] : 1);
         this.proteinConsumption = proteinFactor * userData.weight;
         this.carbsConsumption = parseFloat(((totalCalorie * 0.55) / 4).toFixed(2));
         this.fatsConsumption = parseFloat(((totalCalorie * 0.12)/ 9).toFixed(2));
         this.fiberConsumption = parseFloat(((totalCalorie / 1000) * 15).toFixed(2));
         resultObj = {
          proteinEstimate: this.proteinConsumption,
          carbsEstimate: this.carbsConsumption,
          fatsEstimate: this.fatsConsumption,
          fiberEstimate: this.fiberConsumption,
          calorieEstimate: totalCalorie 
        }
        resolve(resultObj);
         break;

         case('female'):
         let wgCalculation_female = this.weightMultiplier * userData.weight;
         let htCalculation_female = this.heightMultiplier * userData.heightInCm;
         let ageCalculation_female = this.ageMultiplier * userData.age;
         REE = wgCalculation_female + htCalculation_female - ageCalculation_female - this.femaleOffset;
         activityFactor = parseFloat(this.activityCalc_female[userData.activity] ? this.activityCalc_female[userData.activity] : 1);
         totalCalorie = REE * activityFactor;
         proteinFactor = parseFloat(this.proteinCalc_female[userData.goal] ? this.proteinCalc_female[userData.goal] : 1);
         this.proteinConsumption = proteinFactor * userData.weight;
         this.carbsConsumption = parseFloat(((totalCalorie * 0.55) / 4).toFixed(2));
         this.fatsConsumption = parseFloat(((totalCalorie * 0.12)/ 9).toFixed(2));
         this.fiberConsumption = parseFloat(((totalCalorie / 1000) * 15).toFixed(2));
         resultObj = {
           proteinEstimate: this.proteinConsumption,
           carbsEstimate: this.carbsConsumption,
           fatsEstimate: this.fatsConsumption,
           fiberEstimate: this.fiberConsumption,
           calorieEstimate: totalCalorie 
         }
         resolve(resultObj);
         break;


        default:
        break;
       }
      }).catch((err)=>{
        reject(err);
      })
    });
  }

  getUserdata() {
    return new Promise((resolve, reject) => {
      this.apiService.getProfileData(localStorage.getItem('c_id')).subscribe((data:any)=>{
        let heightInCm = parseFloat(data.c_height) * this.heightFtToCmRatio;
        let userdata = {
          age: data.c_age,
          weight: parseFloat(data.c_weight),
          heightInFt: parseFloat(data.c_height),
          heightInCm: heightInCm,
          goal: data.c_fitnessobjective,
          gender: data.c_gender,
          activity: data.c_exercise
        }
        resolve(userdata);
      },  (error) => {
        reject(error);
        console.log('profile data not exists');
      })
    });
  }
}
