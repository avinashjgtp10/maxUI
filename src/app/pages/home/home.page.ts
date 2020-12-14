import { Component, OnInit, ViewChild } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ModalController } from "@ionic/angular";
import { CalorieTrackerPage } from "../calorie-tracker/calorie-tracker.page";
import { IonSlides } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { WaterTrackerPage } from "../water-tracker/water-tracker.page";
import { HandwashTrackerPage } from "../handwash-tracker/handwash-tracker.page";
import { WeightTrackerPage } from "../weight-tracker/weight-tracker.page";
import { ApiCallService } from "src/app/services/api/api-call.service";
import { DateProviderService } from "src/app/services/date/date-provider.service";
import { LoadingContollerService } from "src/app/services/loading/loading-contoller.service";
import { SelectedPlanComponent } from "src/app/components/selected-plan/selected-plan.component";
import { VideoPlayerComponent } from "src/app/components/video-player/video-player.component";

import * as _ from "lodash";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public items: any = [];
  userName = "";
  selectedSegment: any = "breakfast";
  isExpanded: boolean = false;
  allEstimatedData: any = {};
  mealPercetage: any = {
    breakfast: 0.25,
    morning_snack: 0.125,
    lunch: 0.25,
    evening_snack: 0.125,
    dinner: 0.25,
  };
  trackersData = [
    {
      name: "Calorie Tracker",
      todaysValue: "",
      totalValue: "",
      text1: "Current",
      text2: "Goal",
      text3: "",
      show: true,
      isAdded: true,
      trackerFunctionName: "calorieTracker",
      color: "blue",
      percent: 0,
      iconSrc: "assets/icon/icon_calorie_tracker.svg",
    },
    {
      name: "Water Tracker",
      todaysValue: "",
      totalValue: "",
      text1: "",
      text2: "Of",
      text3: "Glass Consumed",
      show: false,
      isAdded: false,
      percent: 0,
      trackerFunctionName: "waterTracker",
      color: "#86CEFF",
      iconSrc: "assets/icon/icon_water_tracker_icon.svg",
    },
    {
      name: "Weight Tracker",
      todaysValue: "",
      totalValue: "",
      text1: "Current",
      text2: "Goal",
      text3: "",
      show: false,
      isAdded: false,
      trackerFunctionName: "weightTracker",
      percent: 0,
      color: "#E02828",
      isGoalSet: false,
      iconSrc: "assets/icon/icon_weight_tracker.svg",
    },
    {
      name: "Handwash Tracker",
      todaysValue: "",
      totalValue: "",
      text1: "",
      text2: "Times Hand Washed of",
      text3: "",
      show: false,
      isAdded: false,
      trackerFunctionName: "handwashTracker",
      color: "green",
      percent: 0,
      iconSrc: "assets/icon/icon_handwash_tracker.svg",
    },
  ];
  liveClassesData: Array<Object> = [];
  liveSessionData = [];
  specialPlanesData: Array<Object> = [];
  @ViewChild("liveClassesSlider", { static: false })
  liveClassesSlider: IonSlides;
  @ViewChild("offersSlider", { static: false }) offersSlider: IonSlides;
  @ViewChild("specialPlansSlider", { static: false })
  specialPlansSlider: IonSlides;
  constructor(
    public actionSheetController: ActionSheetController,
    private route: Router,
    private storage: Storage,
    public modalController: ModalController,
    private apiCallService: ApiCallService,
    private dateProviderService: DateProviderService,
    private loadingContollerService: LoadingContollerService
  ) {}
  liveClassesOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    speed: 400,
  };
  offersOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    speed: 400,
  };
  specialPlansOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    speed: 400,
  };

  ngOnInit() {
    this.dateProviderService
      .getEstiamateOfCalorieConsumption()
      .then((data: any) => {
        this.allEstimatedData = { ...data };
        this.trackersData[0].todaysValue = "0";
        this.trackersData[0].totalValue = Math.round(
          this.allEstimatedData.calorieEstimate
        ).toString();
      });
    this.apiCallService.initialCalorieValue().subscribe((data) => {
      this.trackersData[0].todaysValue = data.calorieToReach;
      this.trackersData[0].totalValue = data.estimatedCalorie;
      this.trackersData[0].percent =
        (data.calorieToReach / data.estimatedCalorie) * 100;
    });

    const payload = {
      date: this.dateProviderService.getTodayDateInFormat(),
      cid: Number(localStorage.getItem("c_id")),
    };
    //this.loadingContollerService.loadingPresent();
    this.apiCallService
      .post(payload, "/dashboard/getData")
      .subscribe((data) => {
        //this.loadingContollerService.loadingDismiss();
        if (data["data"]) {
          let dataArr = data["data"];
          this.userName = dataArr.userProfile.c_name;
          this.liveClassesData = dataArr["featuredVideo"]
            ? _.cloneDeep(dataArr["featuredVideo"])
            : [];
          this.liveSessionData = _.reverse(
            _.cloneDeep(dataArr["featuredVideo"])
          );
          this.specialPlanesData = dataArr.specialPlan;
          this.setDataIntoTrackers(data["data"]);
          this.trackersData[0].todaysValue =
            dataArr.calorieData[0].ccd_onedayconsumedcalorie;
          this.trackersData[0].totalValue =
            dataArr.calorieData[0].ccd_estimated;
          this.trackersData[0].percent =
            (dataArr.calorieData[0].ccd_onedayconsumedcalorie /
              dataArr.calorieData[0].ccd_estimated) *
            100;
        }
      });
  }

  setDataIntoTrackers(data) {
    console.log(data);
    Object.keys(data).forEach((key) => {
      switch (key) {
        case "weightTracker": {
          if (data[key].length > 0 && data[key][0].wet_goal) {
            this.trackersData[2].isAdded = true;
            this.trackersData[2].show = true;
            this.trackersData[2].todaysValue = data[key][0].wet_currentweight;
            this.trackersData[2].totalValue = data[key][0].wet_goal;
            this.trackersData[2].percent =
              ((data[key][0].wet_currentweight -
                data[key][0].wet_startingweight) /
                (data[key][0].wet_goal - data[key][0].wet_startingweight)) *
              100;
          } else {
            this.trackersData[2].isAdded = false;
            this.trackersData[2].text1 = this.trackersData[2].text2 = "";
          }
          break;
        }
        case "waterTracker": {
          if (data[key].length > 0) {
            //data found
            this.trackersData[1].isAdded = true;
            this.trackersData[1].show = true;
            if (
              this.dateProviderService.checkIsTodayWithMoment(
                this.dateProviderService.setDateWithFormat(data[key][0].wt_date)
              )
            ) {
              // data found with today entry
              this.trackersData[1].totalValue = data[key][0].wt_goal;
              this.trackersData[1].todaysValue = data[key][0].wt_achived;
              this.trackersData[1].percent =
                (data[key][0].wt_achived / data[key][0].wt_goal) * 100;
            } else {
              // data found without todays entry
              this.trackersData[1].totalValue = data[key][0].wt_goal; //keep same goal
              this.trackersData[1].todaysValue = "0";
              this.trackersData[1].percent = 0;
            }
          } else {
            //data not found
            this.trackersData[1].isAdded = false;
            this.trackersData[1].text2 = this.trackersData[1].text3 = "";
          }
          break;
        }
        case "handWashTracker": {
          if (data[key].length > 0) {
            //data found
            this.trackersData[3].isAdded = true;
            this.trackersData[3].show = true;
            if (
              this.dateProviderService.checkIsTodayWithMoment(
                this.dateProviderService.setDateWithFormat(data[key][0].ht_date)
              )
            ) {
              // data found with today entry
              this.trackersData[3].totalValue = "16";
              this.trackersData[3].todaysValue = data[key][0].ht_achived;
              this.trackersData[3].percent =
                (data[key][0].ht_achived / 16) * 100;
            } else {
              // data found without todays entry
              this.trackersData[3].totalValue = "16"; //keep same goal
              this.trackersData[3].todaysValue = "0";
              this.trackersData[3].percent = 0;
            }
          } else {
            //data not found
            this.trackersData[3].isAdded = false;
            this.trackersData[3].text2 = "";
          }
          break;
        }
        case "calorieData": {
          //statements;
          break;
        }
      }
    });
  }

  openTrackerDetail(event) {
    this[event.actionName]();
  }
  async waterTracker() {
    const modal = await this.modalController.create({
      component: WaterTrackerPage,
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.isUpdate) {
        this.trackersData[1].todaysValue = data.data.currentValue;
        this.trackersData[1].totalValue = data.data.goal;
        this.trackersData[1].percent =
          (data.data.currentValue / data.data.goal) * 100;
        this.trackersData[1].text2 = "Of";
        this.trackersData[1].text3 = "Glass Consumed";
      }
    });
    return await modal.present();
  }

  async calorieTracker() {
    const modal = await this.modalController.create({
      component: CalorieTrackerPage,
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss();

    return await modal.present();
  }

  async handwashTracker() {
    const modal = await this.modalController.create({
      component: HandwashTrackerPage,
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.isUpdate) {
        this.trackersData[3].todaysValue = data.data.currentValue;
        this.trackersData[3].totalValue = data.data.goal;
        this.trackersData[3].percent =
          (data.data.currentValue / data.data.goal) * 100;
        this.trackersData[3].text2 = "Times Hand Washed of";
      }
    });
    return await modal.present();
  }

  async weightTracker() {
    const modal = await this.modalController.create({
      component: WeightTrackerPage,
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.isUpdate) {
        this.trackersData[2].todaysValue = data.data.currentValue;
        this.trackersData[2].totalValue = data.data.goal;
        this.trackersData[2].percent =
          ((data.data.currentValue - data.data.startingValue) /
            (data.data.goal - data.data.startingValue)) *
          100;
        this.trackersData[2].text1 = "Current";
        this.trackersData[2].text2 = "Goal";
      }
    });
    return await modal.present();
  }

  async OnPlan(selectedPlan: any) {
    const modal = await this.modalController.create({
      component: SelectedPlanComponent,
      cssClass: "selected-plan-component",
      componentProps: {
        selectedPlan: selectedPlan,
      },
    });
    return await modal.present();
  }

  async onLiveClass(url) {
    if (url) {
      const modal = await this.modalController.create({
        component: VideoPlayerComponent,
        cssClass: "mac-video-player",
        componentProps: {
          dataSource: url,
        },
      });
      return await modal.present();
    }
  }
}
