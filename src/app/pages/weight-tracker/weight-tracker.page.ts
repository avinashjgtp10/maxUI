import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as CanvasJS from './../../../assets/lib/canvasjs.min';
import { DateSliderPage } from '../date-slider/date-slider.page';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { DateProviderService } from 'src/app/services/date/date-provider.service';
import { ToastProvider } from 'src/app/services/toast/toast';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { IonSlides } from '@ionic/angular';
import { AddWeightGoalPage } from './add-weight-goal/add-weight-goal.page';
import { AddWeightValuePage } from './add-weight-value/add-weight-value.page';

@Component({
  selector: 'app-weight-tracker',
  templateUrl: './weight-tracker.page.html',
  styleUrls: ['./weight-tracker.page.scss'],
})
export class WeightTrackerPage implements OnInit {



  @ViewChild('weightSlider', { static: false }) weightSlider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };
  math = Math;
  initialWeight: number = 0;
  objective: string;
  graphViewableDateText = "Last 7 days"
  weightDataObject = {
    wet_goal: undefined,
    wet_date: "",
    wet_currentweight: 60,
    wet_activitylevel: 'high',
    wet_startingweight: undefined,
    wet_achive:0

  }
  presentData = {
    wet_goal: undefined,
    wet_date: "",
    wet_currentweight: 0,
    wet_activitylevel: 'high',
    wet_startingweight: undefined
  }
  addDataSubscribe;
  oneMonthData;
  fromDate: string;
  graphDatatoPlot = [

  ];
  chart = [];

  isDateSliderOpened: boolean = false;

  selectedActiveDateFormat: string = "Today";


  constructor(private modalController: ModalController,
    private apiService: ApiCallService,
    private dateProviderService: DateProviderService,
    private toastProvider: ToastProvider,
    private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {
    this.getWeightDataofOneMonth()
  }
  getWeightDataofOneMonth() {
    this.loadingContollerService.loadingPresent();
    this.dateProviderService.getOneMonthdatelimits('weight').then(oneMonthBalnkData => {
      this.fromDate = oneMonthBalnkData[0]['wet_date']
      const payload = {
        "from_date": oneMonthBalnkData[0]['wet_date'],
        "to_date": oneMonthBalnkData[oneMonthBalnkData["length"] - 1]['wet_date'],
        "wet_cid": Number(localStorage.getItem("c_id"))
      }
      this.apiService.post(payload, "/weightTracker/search").subscribe(data => {
        if (data['date']["length"] > 0) {
          for (let i = 0; i < data['date']["length"]; i++) {
            if(!data['date'][i].wet_date){
              data['date'][i].wet_currentweight = Number(data['date'][i].wet_currentweight);
              this.presentData.wet_currentweight = this.presentData.wet_startingweight = this.weightDataObject.wet_achive = data['date'][i].wet_achive = (data['date'][i].wet_currentweight);
              this.presentData.wet_activitylevel  = data['date'][i].wet_activitylevel;
              data['date'][i].wet_date = this.dateProviderService.getTodayDateInFormat();
              this.updateDatailMainArray(data['date'][i], oneMonthBalnkData, false);
               break;
            }else{
              data['date'][i].wet_date = this.dateProviderService.setDateWithFormat(data['date'][i].wet_date);
              this.updateDatailMainArray(data['date'][i], oneMonthBalnkData, false);
              if(data['date'][i].wet_goal){
                this.checkObjective()
              }
            }
            
          }
        }
      
         this.oneMonthData = oneMonthBalnkData
         this.plotGraph()
         this.loadingContollerService.loadingDismiss();
         this.weightDataObject = this.getTodaysData(payload.to_date);
      }, (error) => {
        this.loadingContollerService.loadingDismiss();
        this.toastProvider.presentToast('Ooops... Error in getting data');
      })
    }, (error) => {
      this.toastProvider.presentToast('Ooops... Error in getting dates')
      this.loadingContollerService.loadingDismiss();
    })
  }

  getTodaysData(date_string) {
    const currentData = {
      wet_goal: 0,
      wet_currentweight: 60,
      wet_date: date_string,
      wet_activitylevel: 'high',
      wet_startingweight: 0,
      wet_achive: 0
    }
    for (let i = 0; i < this.oneMonthData.length; i++) {
      if (this.oneMonthData[i].wet_date === date_string) {
        currentData.wet_date = date_string;
        currentData.wet_goal = this.oneMonthData[i].wet_goal;
        currentData.wet_currentweight = this.oneMonthData[i].wet_currentweight;
        currentData.wet_activitylevel = this.oneMonthData[i].wet_activitylevel;
        currentData.wet_achive = this.oneMonthData[i].wet_achive;
        currentData.wet_startingweight = this.presentData.wet_startingweight
        if(!this.initialWeight){
           this.initialWeight =  this.oneMonthData[i].wet_currentweight;
        }
       break;
      }
    }
    return currentData;
  }

  updateDatailMainArray(record, addArray, updateGraph) {
    let latestDataIndex = 0;
    for (let i = 0; i < addArray.length; i++) {
      if (addArray[i].wet_date === record.wet_date) {
        addArray[i].wet_goal = record.wet_goal;
        addArray[i].wet_currentweight = record.wet_currentweight;
        addArray[i].wet_achive = record.wet_achive;
        addArray[i].wet_startingweight = record.wet_startingweight;
        latestDataIndex = i;
        break;
      }
    }
    this.presentData.wet_currentweight = addArray[latestDataIndex].wet_currentweight;
    this.presentData.wet_startingweight = addArray[latestDataIndex].wet_startingweight;
    this.presentData.wet_activitylevel  = addArray[latestDataIndex].wet_activitylevel;
    this.presentData.wet_goal = addArray[latestDataIndex].wet_goal
    console.log(this.presentData);
    if(updateGraph){
      for( let i= 0; i < this.graphDatatoPlot.length; i++){
        for(let j = 0; j < this.graphDatatoPlot[i]['plotConsumed'].length; j++){
          if(this.graphDatatoPlot[i]['plotConsumed'][j].date === record.wet_date){
            this.chart[i].options.data[0].dataPoints[j].y = record.wet_achive; 
            // this.chart[i].options.data[1].dataPoints[j].y = record.wet_currentweight; 
            this.chart[i].render();
            break;
          }
        }
      }
    }
  }


  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
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
        selectedDate: this.weightDataObject.wet_date
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isDateSliderOpened = false;
        if (data.data) {
          this.weightDataObject.wet_date = data.data.dateFormatted;
          this.weightDataObject  = this.getTodaysData(data.data.dateFormatted);
          if (!(data.data.isToday)) {
            this.selectedActiveDateFormat = (data.data.pageText);
          } else {
            this.selectedActiveDateFormat = "Today";
          }
        }
      });
    return await modal.present();
  }

  openAddGoalSheet(){
    this.openGoalSheet()
  }
  openAddWeightSheet(){
    this.addWeightSheet()
  }
  async openGoalSheet() {
    const presentModel = await this.modalController.create({
      component: AddWeightGoalPage,
      componentProps: {
        goalWeight: this.presentData.wet_goal,
        currentWeight: this.presentData.wet_currentweight,
        currentActivityLevel: this.weightDataObject.wet_activitylevel
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'add-goal-component'
    });

    presentModel.onWillDismiss().then((data) => {
      if (data.data) {
       this.presentData.wet_activitylevel = data.data["activityLevel"];
       this.presentData.wet_goal = data.data["goalWeights"];
       this.presentData.wet_startingweight = data.data["startingValue"]
       this.checkObjective();
      this.postDataByDate();

      }
      //custom code
    });

    return await presentModel.present();

  }

  checkObjective(){
    if(this.presentData.wet_currentweight < this.presentData.wet_goal){
      this.objective =  "Gain";
    }else if(this.presentData.wet_currentweight > this.presentData.wet_goal){
      this.objective =  "Lost";
    }
  }

  async addWeightSheet() {
    
    const presentModel = await this.modalController.create({
      component: AddWeightValuePage,
      componentProps: {
        currentWeight: this.presentData.wet_currentweight ? this.presentData.wet_currentweight : this.initialWeight
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'action-sheet-component'
    });

    presentModel.onWillDismiss().then((data) => {
      if (data.data) {
        this.weightDataObject.wet_achive = data.data; 
       if(this.selectedActiveDateFormat === 'Today')
        {
          this.presentData.wet_currentweight = data.data;
        }
       
       this.postDataByDate();
      }
      //custom code
    });

    return await presentModel.present();

  }


  slideChanged(e) {
    this.weightSlider.getActiveIndex().then(index => {
      if(index !== 3){
        this.graphViewableDateText = this.graphDatatoPlot[3-index].plotConsumed[0].label + " - " + this.graphDatatoPlot[3-index].plotConsumed[6].label;
      }else{
        this.graphViewableDateText = "Last 7 days";
      }
    });
  }

  postDataByDate() {
    if (this.selectedActiveDateFormat === 'Today' && this.presentData.wet_currentweight == this.presentData.wet_goal) {
      this.toastProvider.presentToast("Congrats... You have achived your goal");
    }
    const payload = {
      "wet_date": this.weightDataObject.wet_date,
      "wet_goal": Number(this.presentData.wet_goal),
      "wet_currentweight": Number(this.presentData.wet_currentweight),
      "wet_cid": Number(localStorage.getItem("c_id")),
      "wet_activitylevel": this.presentData.wet_activitylevel,
      "wet_achive": Number(this.weightDataObject.wet_achive),
      "wet_startingweight": Number(this.presentData.wet_startingweight),
      "wet_unit": "KG"
    }
    if (this.addDataSubscribe) {
      this.addDataSubscribe.unsubscribe();
    }
    this.updateDatailMainArray(payload, this.oneMonthData, true)
    this.addDataSubscribe = this.apiService.post(payload, '/weightTracker/addupdate').subscribe((response: any) => {
     
    }, (error) => {
    });
  }

  plotGraph() {
    let plotConsumed = [];
    // let plotGoal = [];
    let count = 4;
    for (let i = this.oneMonthData.length - 1; i >= 0; i--) {
      const dataConsumed = {
        label: this.oneMonthData[i].wet_date_graphFormat,
        y: this.oneMonthData[i].wet_achive,
        date: this.oneMonthData[i].wet_date
      }
      // const dataGoal = {
      //   label: "",
      //   y: this.oneMonthData[i].wet_goal,
      //   date: this.oneMonthData[i].wet_date
      // }
      if (plotConsumed.length < 7) {
        plotConsumed.push(dataConsumed);
        // plotGoal.push(dataGoal)
      } else {
        const arrt1 = plotConsumed;
        // const arr2 = plotGoal;
        const graphdata = {
          // plotGoal: plotGoal.reverse(),
          plotConsumed: plotConsumed.reverse()
        }
        const tempCount = count;
        this.graphDatatoPlot.push(graphdata)
        plotConsumed = [];
        // plotGoal = [];
        setTimeout(() => {
          this.renderChart(arrt1, tempCount);
        }, 100);
        plotConsumed.push(dataConsumed);
        this.weightSlider.slideTo(3);
        //plotGoal.push(dataGoal);
        count = count - 1
      }
    }
  }

  renderChart(arrt1, i) {
    let chartPart = new CanvasJS.Chart("weightContainer" + i, {
      dataPointWidth: 30,
      toolTip:{  
        enabled: false
       },
      animationEnabled: true,
      axisX: {
        title: "",
        labelMaxWidth: 40,
        labelFontSize: 20,
        labelFontColor:"#A5A5A5",
        gridThickness: 0,
        tickLength: 10,
        lineThickness: 0,
        tickThickness: 0
      },
      axisY: {
        title: "",
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
        minimum: this.presentData.wet_currentweight - 25,
        viewportMinimum: this.presentData.wet_currentweight - 25,
        maximun: this.presentData.wet_currentweight + 15,
        viewportMaximum: this.presentData.wet_currentweight + 15,
        labelFormatter: function () {
          return " ";
        }
      }
      ,

      data: [
        {
          type: "column",
          legendText: "Weight (KG)",
          showInLegend: true,
          color: "#A5A5A5",
          indexLabel: "{y}",
          indexLabelFontSize: 15,
          dataPoints:
            arrt1
          ,

        },
        // {
        //   type: "column",
        //   legendText: "Consumed Water",
        //   showInLegend: true,
        //   indexLabel: "{y}",
        //   indexLabelFontSize: 15,
        //   color: "#EBF4FA",
        //   dataPoints:arrt1
        // }
      ]
    });
    chartPart.render();
    this.chart.push(chartPart);
  }

}
