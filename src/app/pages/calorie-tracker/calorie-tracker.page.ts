import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddCaloriePage } from "../add-calorie/add-calorie.page";
import { InsightsPage } from "../insights/insights.page";
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { DateProviderService } from "../../services/date/date-provider.service";
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import * as moment from "moment";

@Component({
  selector: "app-calorie-tracker",
  templateUrl: "./calorie-tracker.page.html",
  styleUrls: ["./calorie-tracker.page.scss"],
})
export class CalorieTrackerPage implements OnInit {
  selectedSegment: any = "breakfast";
  segmentData: any = [];
  backUpConsumedData: any = [];
  oneDayConsumedCalorie: any;
  calorieToReach: any;
  calorieProgressBar: number = 0;
  consumedFoodData: any = [];
  allEstimatedData: any = {};
  calorieEstimated: number = 0;
  calorieConsumed: number = 0;
  mealPercetage: any = {
    breakfast: 0.25,
    morning_snack: 0.125,
    lunch: 0.25,
    evening_snack: 0.125,
    dinner: 0.25,
  };
  otherMealfactor: number = 0.2;
  numColumns: number = 2;
  constructor(
    public modalController: ModalController,
    public apiService: ApiCallService,
    public loadingService: LoadingContollerService,
    public dateService: DateProviderService,
    private pickerController: PickerController
  ) {}

  ngOnInit() {
    this.segmentData = [
      {
        segmentName: "Breakfast",
        segmentValue: "breakfast",
      },
      {
        segmentName: "Morning Snack",
        segmentValue: "morning_snack",
      },
      {
        segmentName: "Lunch",
        segmentValue: "lunch",
      },
      {
        segmentName: "Evening Snack",
        segmentValue: "evening_snack",
      },
      {
        segmentName: "Dinner",
        segmentValue: "dinner",
      },
    ];
  }
  ionViewWillEnter() {
    this.updateData();
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async openPicker(item) {
    let selectedIndex1 = parseFloat(item.c_amount) * 4;
    selectedIndex1 = parseFloat(selectedIndex1.toFixed(2));
    let selectedIndex2 = item.c_measure.indexOf(item.c_clientmeasure);
    let options: PickerOptions = {
      keyboardClose: true,
      animated: true,
      mode: "ios",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Ok",
          handler: (value: any) => {
            this.updateItemCalculations(value, item);
          },
        },
      ],
      columns: this.getColumns(item),
    };
    let picker = await this.pickerController.create(options);
    picker.columns[0].selectedIndex = selectedIndex1 - 1;
    picker.columns[1].selectedIndex = selectedIndex2 - 1;
    picker.present();
  }
  getColumns(item) {
    let columns = [];
    for (let i = 0; i < this.numColumns; i++) {
      columns.push({
        name: i,
        options: this.getColumnOptions(i, item),
      });
    }
    return columns;
  }
  getColumnOptions(columIndex: number, item) {
    let options = [];
    if (columIndex === 0) {
      for (let i = 1; i < 1000; i++) {
        let value = (i / 4).toFixed(2);
        options.push({
          text: `${value}`,
          value: parseFloat(value),
        });
      }
    } else {
      for (let i = 0; i < item.c_measure.length; i++) {
        options.push({
          text: item.c_measure[i],
          value: item.c_measure[i],
        });
      }
    }

    return options;
  }
  updateItemCalculations(selectedValue, item) {
    let newValue = selectedValue[0].value;
    let originalValue = parseFloat(item.c_amount);
    let ratio = originalValue / newValue;
    let newCalories = parseFloat(item.c_calories) / ratio;
    let newFats = parseFloat(item.c_fats) / ratio;
    let newCarbs = parseFloat(item.c_carbohydrates) / ratio;
    let newFibers = parseFloat(item.c_fibres) / ratio;
    let newProteins = parseFloat(item.c_proteins) / ratio;

    item.c_calories = newCalories;
    item.c_amount = newValue;
    item.c_carbohydrates = newCarbs;
    item.c_fibres = newFibers;
    item.c_fats = newFats;
    item.c_proteins = newProteins;

    this.loadingService.loadingPresent();
    this.apiService
      .updateFoodItem(item, localStorage.getItem("c_id"), item.co_id)
      .subscribe(
        (result) => {
          console.log(result);
          this.loadingService.loadingDismiss();
          this.updateData();
        },
        (error) => {
          this.loadingService.loadingDismiss();
        }
      );
  }
  deleteItem(food) {
    this.loadingService.loadingPresent();
    this.apiService
      .deleteFoodItem(localStorage.getItem("c_id"), food.co_id)
      .subscribe(
        (result) => {
          console.log(result);
          this.loadingService.loadingDismiss();
          this.updateData();
        },
        (error) => {
          this.loadingService.loadingDismiss();
        }
      );
  }
  updateData() {
    this.loadingService.loadingPresent();
    let date = moment().format("DD/MM/YYYY");
    this.dateService.getEstiamateOfCalorieConsumption().then((data: any) => {
      console.log("data", data);
      this.allEstimatedData = { ...data };
      this.apiService
        .getUserFoodData(date, date, localStorage.getItem("c_id"))
        .subscribe(
          (response: any) => {
            this.backUpConsumedData = response;
            if (this.backUpConsumedData.length) {
              this.oneDayConsumedCalorie = this.backUpConsumedData.reduce(
                (acc, obj) => {
                  return acc + parseFloat(obj.c_calories);
                },
                0
              );
            } else {
              this.oneDayConsumedCalorie = 0;
            }
            this.consumedFoodData = this.backUpConsumedData.filter(
              (item, i, a) => {
                return item.consumed_category === this.selectedSegment;
              }
            );
            this.calculateConsumption();
            this.loadingService.loadingDismiss();
            console.log("response", response);
          },
          (error) => {
            this.loadingService.loadingDismiss();
            console.log("error", error);
          }
        );
    });
  }
  calculateConsumption() {
    this.calorieConsumed = this.consumedFoodData.reduce((acc, obj) => {
      return acc + parseFloat(obj.c_calories);
    }, 0);

    this.calorieEstimated =
      this.allEstimatedData.calorieEstimate *
      this.mealPercetage[this.selectedSegment];
    this.calorieToReach =
      this.allEstimatedData.calorieEstimate - this.oneDayConsumedCalorie;
  


    let data = {
      estimatedCalorie: Math.round(parseFloat(this.calorieToReach)),
      calorieToReach: Math.round(this.calorieConsumed),
    };

    let payload = {
      oneday: Math.round(this.calorieConsumed),
      estimated: Math.round(parseFloat(this.calorieToReach)),
      cid: localStorage.getItem("c_id"),
      date: moment().format("DD/MM/YYYY"),
    };

    this.apiService.storeDayWiseCalorieConsumtion(payload).subscribe((data) => {
      console.log(data);
    });
    this.apiService.setCalorieConsumtion(data);
    if (this.oneDayConsumedCalorie) {
      this.calorieProgressBar =
        this.oneDayConsumedCalorie / this.allEstimatedData.calorieEstimate;
    } else {
      this.calorieProgressBar = 0;
    }
  }
  segmentChanged(e) {
    this.consumedFoodData = [];
    this.consumedFoodData = this.backUpConsumedData.filter((item, i, a) => {
      return item.consumed_category === this.selectedSegment;
    });
    this.calculateConsumption();
  }
  async openAddYourMeal() {
    const modal = await this.modalController.create({
      component: AddCaloriePage,
      componentProps: {
        selectedSegment: this.selectedSegment,
      },
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.isRefresh) {
        this.updateData();
      }
    });
    return await modal.present();
  }

  async openInsights() {
    const modal = await this.modalController.create({
      component: InsightsPage,
      componentProps: {
        allEstimatedData: this.allEstimatedData,
      },
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
}
