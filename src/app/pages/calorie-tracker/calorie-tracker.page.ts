import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCaloriePage } from '../add-calorie/add-calorie.page';
import { InsightsPage } from '../insights/insights.page';
import { ApiCallService } from "../../services/api/api-call.service";
import { ChartCalculationsService } from "../../services/chart/chart-calculations.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
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
  constructor(public modalController: ModalController,
    public apiService: ApiCallService,  
    public loadingService: LoadingContollerService) { }

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
   this.apiService.getUserFoodData(date,date,localStorage.getItem('c_id')).subscribe((response: any) => {
     this.backUpConsumedData = response;
     this.consumedFoodData = this.backUpConsumedData.filter((item,i,a)=> {
         return item.consumed_category === this.selectedSegment;
     });
     this.loadingService.loadingDismiss();
     console.log('response',response);
     console.log('this.consumedFoodData',this.consumedFoodData);
     console.log('this.backUpConsumedData',this.backUpConsumedData);
   }, (error) => {
     this.loadingService.loadingDismiss();
     console.log("error",error);
   });
  }
  segmentChanged(e) {
    console.log(e);
    this.consumedFoodData = [];
    this.consumedFoodData = this.backUpConsumedData.filter((item,i,a)=> {
      return item.consumed_category === this.selectedSegment;
    });
    console.log('this.consumedFoodData',this.consumedFoodData);
    console.log('this.backUpConsumedData',this.backUpConsumedData);
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
      console.log(data);
      if(data.data.isRefresh){
        this.updateData();
      }
     });
    return await modal.present();
  }

  async openInsights() {
    const modal = await this.modalController.create({
      component: InsightsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
