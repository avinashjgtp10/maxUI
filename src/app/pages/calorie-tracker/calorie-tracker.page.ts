import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCaloriePage } from '../add-calorie/add-calorie.page';
import { InsightsPage } from '../insights/insights.page';
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { DateProviderService } from "../../services/date/date-provider.service";

import * as moment from 'moment';

@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.page.html',
  styleUrls: ['./calorie-tracker.page.scss'],
})
export class CalorieTrackerPage implements OnInit {
  selectedSegment: any = 'breakfast';
  segmentData: any = [];
  backUpConsumedData: any = [];
  consumedFoodData: any = [];
  allEstimatedData: any = {};
  calorieEstimated: number = 0;
  calorieConsumed: number = 0;
  otherMealfactor: number = 0.2;
  constructor(public modalController: ModalController,
    public apiService: ApiCallService,  
    public loadingService: LoadingContollerService,
    public dateService: DateProviderService) { }

  ngOnInit() {
    this.segmentData = [
    {
      segmentName: 'Breakfast',
      segmentValue: 'breakfast'
    },
    {
      segmentName: 'Morning Snack',
      segmentValue: 'morning_snack'
    },
    {
      segmentName: 'Lunch',
      segmentValue: 'lunch'
    },
    {
      segmentName: 'Evening Snack',
      segmentValue: 'evening_snack'
    },
    {
      segmentName: 'Dinner',
      segmentValue: 'dinner'
    }];
  }
  ionViewWillEnter() {
    this.updateData();
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  updateData(){
    this.loadingService.loadingPresent();
    let date = moment().format('DD/MM/YYYY');
    this.dateService.getEstiamateOfCalorieConsumption().then((data:any)=>{
      console.log('data',data);
      this.allEstimatedData = {...data};
      this.apiService.getUserFoodData(date,date,localStorage.getItem('c_id')).subscribe((response: any) => {
        this.backUpConsumedData = response;
        this.consumedFoodData = this.backUpConsumedData.filter((item,i,a)=> {
            return item.consumed_category === this.selectedSegment;
        });
        this.calculateConsumption();
        this.loadingService.loadingDismiss();
        console.log('response',response);
      }, (error) => {
        this.loadingService.loadingDismiss();
        console.log("error",error);
      });
   });
  }
  calculateConsumption() {
    this.calorieConsumed = this.consumedFoodData.reduce((acc,obj) => {
      return acc + parseFloat(obj.c_calories);
    }, 0);
    this.calorieEstimated = (this.allEstimatedData.calorieEstimate).toFixed(2) * this.otherMealfactor;
  }
  segmentChanged(e) {
    this.consumedFoodData = [];
    this.consumedFoodData = this.backUpConsumedData.filter((item,i,a)=> {
      return item.consumed_category === this.selectedSegment;
    });
    this.calculateConsumption();
   }
  async openAddYourMeal() {
    const modal = await this.modalController.create({
      component: AddCaloriePage,
      componentProps: {
        'selectedSegment': this.selectedSegment
      },
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then((data) => {
      if(data.data.isRefresh){
        this.updateData();
      }
     });
    return await modal.present();
  }

  async openInsights() {
    const modal = await this.modalController.create({
      component: InsightsPage,
      componentProps: {
        'allEstimatedData': this.allEstimatedData
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
