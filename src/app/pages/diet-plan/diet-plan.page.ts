import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import * as moment from 'moment';
import { DateSliderPage } from '../date-slider/date-slider.page';
import { DateProviderService } from "../../services/date/date-provider.service";
import { ModalController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BookAppointmentComponent } from 'src/app/components/book-appointment/book-appointment.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.page.html',
  styleUrls: ['./diet-plan.page.scss'],
})
export class DietPlanPage implements OnInit {
  @ViewChild("overlay") overlay: ElementRef;
  bookApt = false;
  scheduled = false;
  isDateSliderOpened: boolean = false;
  clientId: string = localStorage.getItem('c_id');
  calorieProgressBar: number = 0;
  calorieToReach: any;
  calorieConsumed: any;
  dietFoodData: any = [];
  selectedFoodData: any = [];
  dietFoodMorningData: any = [];
  morningCalories: number = 0;
  breakfastCalories: number = 0;
  lunchCalories: number = 0;
  eveningCalories: number = 0;
  dinnerCalories: number = 0;
  dietFoodBreakfastData: any = [];
  dietFoodLunchData: any = [];
  dietFoodEveningData: any = [];
  dietFoodDinnerData: any = [];
  allEstimatedData: any;
  toast: any;
  selectedActiveDateFormat: string = "Today";
  selectedDate = moment().format('DD/MM/YYYY');
  today = moment().format('DD/MM/YYYY');
  currentData = {
    ht_date: ''
  }
  fromDate: any;
  constructor(public loadingService: LoadingContollerService,
    public modalController: ModalController,
    private location: Location,
    public dateService: DateProviderService,
    public apiCallService: ApiCallService,
    public toastController: ToastController) { }

  ngOnInit() {
    console.log("calling")
    this.today = moment().format('DD/MM/YYYY');
    this.fromDate = moment().subtract(1, 'M').format('DD/MM/YYYY');
    this.initData();
  }
  initData() {
    this.loadingService.loadingPresent();
    this.dateService.getEstiamateOfCalorieConsumption().then((res: any) => {
      this.allEstimatedData = { ...res };
      console.log('this.allEstimatedData',this.allEstimatedData);
      this.calorieToReach = this.allEstimatedData.calorieEstimate;
      this.calorieConsumed = 0;
      if(this.calorieConsumed){
        this.calorieProgressBar = this.calorieConsumed / this.calorieToReach;
      } else {
        this.calorieProgressBar = 0;
      }
      this.apiCallService.getDietPlan(localStorage.getItem('c_id')).subscribe((data: any) => {
        this.loadingService.loadingDismiss();
        console.log('data', data.data);
        this.dietFoodData = data.data.item;
        this.dietFoodMorningData = data.data.item.filter((v) => {
          return v.c_category[0] === 'morning_snack';
        });
        this.dietFoodBreakfastData = data.data.item.filter((v) => {
          return v.c_category[0] === 'breakfast';
        });
        this.dietFoodLunchData = data.data.item.filter((v) => {
          return v.c_category[0] === 'lunch';
        });
        this.dietFoodEveningData = data.data.item.filter((v) => {
          return v.c_category[0] === 'evening_snack';
        });
        this.dietFoodDinnerData = data.data.item.filter((v) => {
          return v.c_category[0] === 'dinner';
        });
      })
    })

  }
  calculateConsumption() {
    // this.calorieEstimated = this.allEstimatedData.calorieEstimate;
    // this.calorieProgressBar = 0;
  }
  openDateSlide() {
    if (!this.isDateSliderOpened) {
      this.openDateSliderModal();
    }
  }
  async openDateSliderModal() {
    this.isDateSliderOpened = true;
    const modal = await this.modalController.create({
      component: DateSliderPage,
      cssClass: 'date-slider-component',
      componentProps: {
        fromDate: this.fromDate,
        toDate: undefined,
        selectedDate: this.currentData.ht_date
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isDateSliderOpened = false;
        if (data.data) {
          if (!(data.data.isToday)) {
            this.selectedActiveDateFormat = (data.data.pageText);
            this.selectedDate = data.data.dateFormatted;

          } else {
            this.selectedActiveDateFormat = "Today";
            this.selectedDate = this.today;
          }
        }
      });
    return await modal.present();
  }
  foodSelected(food,i, category) {
    let result = this.selectedFoodData.filter(e => (e.c_id === food.c_id));
    console.log('result', result);
    if (result.length > 0) {
      let index = this.selectedFoodData.findIndex(item => (item.c_id === result[0].c_id));
      this.selectedFoodData.splice(index, 1);
      switch (category) {
        case 'morning_snack':
          this.morningCalories = this.morningCalories - parseInt(this.dietFoodMorningData[i].c_calories);
          this.dietFoodMorningData[i].isAddedInDiet = false;
          break;
        case 'breakfast':
          this.breakfastCalories = this.breakfastCalories - parseInt(this.dietFoodBreakfastData[i].c_calories);
          this.dietFoodBreakfastData[i].isAddedInDiet = false;
          break;
        case 'lunch':
          this.lunchCalories = this.lunchCalories - parseInt(this.dietFoodLunchData[i].c_calories);
          this.dietFoodLunchData[i].isAddedInDiet = false;
          break;
        case 'evening_snack':
          this.eveningCalories = this.eveningCalories - parseInt(this.dietFoodEveningData[i].c_calories);
          this.dietFoodEveningData[i].isAddedInDiet = false;
          break;
        case 'dinner':
          this.dinnerCalories = this.dinnerCalories - parseInt(this.dietFoodDinnerData[i].c_calories);
          this.dietFoodDinnerData[i].isAddedInDiet = false;
          break;
      }
    } else {
      switch (category) {
        case 'morning_snack':
            this.morningCalories = this.morningCalories + parseInt(this.dietFoodMorningData[i].c_calories);
          this.dietFoodMorningData[i].isAddedInDiet = true;
          break;
        case 'breakfast':
            this.breakfastCalories = this.breakfastCalories + parseInt(this.dietFoodBreakfastData[i].c_calories);
          this.dietFoodBreakfastData[i].isAddedInDiet = true;
          break;
        case 'lunch':
            this.lunchCalories = this.lunchCalories + parseInt(this.dietFoodLunchData[i].c_calories);
          this.dietFoodLunchData[i].isAddedInDiet = true;
          break;
        case 'evening_snack':
            this.eveningCalories = this.eveningCalories + parseInt(this.dietFoodEveningData[i].c_calories);
          this.dietFoodEveningData[i].isAddedInDiet = true;
          break;
        case 'dinner':
          this.dinnerCalories = this.dinnerCalories + parseInt(this.dietFoodDinnerData[i].c_calories);
          this.dietFoodDinnerData[i].isAddedInDiet = true;
          break;
      }
      this.selectedFoodData.push(food);
    }

    if (this.selectedFoodData.length) {
      this.presentToastWithOptions(this.selectedFoodData, category);
      this.progressBarCalculations();
      console.log('this.selectedFoodData', this.selectedFoodData);
    } else {
      this.toast.dismiss();
      this.calorieConsumed = 0;
      this.calorieProgressBar = 0;
    }
   
  }
  progressBarCalculations(){
    this.calorieConsumed = 0;
    this.selectedFoodData.forEach((v,i,a)=>{
      this.calorieConsumed = this.calorieConsumed + parseInt(v.c_calories);
    });
    if(this.calorieConsumed){
      this.calorieProgressBar = this.calorieConsumed / this.calorieToReach;
    } else {
      this.calorieProgressBar = 0;
    }
  }
  closeModal() {
    this.location.back();
  }
  dismissToast() {
    this.toast.dismiss();
  }

  async presentToastWithOptions(data, category) {
    if (this.toast) {
      this.toast.dismiss();
    }
    this.toast = await this.toastController.create({
      message: `${data.length} items selected`,
      position: 'bottom',
      mode: 'md',
      cssClass: 'add-calorie-toast',
      keyboardClose: true,
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'UNDO',
          handler: () => {
            this.selectedFoodData = [];
            this.dietFoodMorningData.forEach((item) => {
              if (item.isAddedInDiet) {
                item.isAddedInDiet = false;
              }
            });
            this.dietFoodBreakfastData.forEach((item) => {
              if (item.isAddedInDiet) {
                item.isAddedInDiet = false;
              }
            });
            this.dietFoodLunchData.forEach((item) => {
              if (item.isAddedInDiet) {
                item.isAddedInDiet = false;
              }
            });
            this.dietFoodEveningData.forEach((item) => {
              if (item.isAddedInDiet) {
                item.isAddedInDiet = false;
              }
            });
            this.dietFoodDinnerData.forEach((item) => {
              if (item.isAddedInDiet) {
                item.isAddedInDiet = false;
              }
            });
            console.log('Undo clicked', this.dietFoodData);
          }
        }, {
          side: 'end',
          text: 'DONE',
          handler: () => {
            console.log('Done clicked Api Call');
            this.loadingService.loadingPresent();
            let args = {
              caloriesConsumption: this.selectedFoodData
            }
            this.selectedFoodData.forEach((item) => {
              let now = new Date();
              item.date = this.selectedDate;
              item.consumed_category = category;
              item.co_id = parseInt(this.clientId) + item.c_id + now.getTime();
            })
            this.apiCallService.storeFoodData(args, localStorage.getItem('c_id')).subscribe((response: any) => {
              console.log('response', response);
              this.loadingService.loadingDismiss();
              this.dismissToast();
              this.closeModal();
            }, (error) => {
              this.loadingService.loadingDismiss();
              console.log("error", error);
            });
          }
        }
      ]
    });
    this.toast.present();
  }
  onBookAppointment() {
    this.bookApt = true;
    this.overlay.nativeElement.style['display'] = 'block';
  }
  async OnSelectTrainer(selectedPlan: any) {
    this.bookApt = false;
    this.overlay.nativeElement.style['display'] = 'none';
    const modal = await this.modalController.create({
      component: BookAppointmentComponent,
      cssClass: 'book-appointment-component',
      componentProps: {
        'selectedPlan': selectedPlan
      },
    });
    modal.onDidDismiss().then((data) => {
      if(data.data.appointment){
       this.scheduleAppointment(data.data['appointment'])
      }
     });
    return await modal.present();
  }
  scheduleAppointment(data) {
    this.apiCallService.scheduleAppointment(data).subscribe((res) => {
      this.scheduled  =  true;
    }, err => {
      console.log("Unable to schedule appointment");
    })
  }
}
