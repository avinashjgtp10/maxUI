import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddWaterComponentPage } from './add-water-component/add-water-component.page';
import * as CanvasJS from './../../../assets/lib/canvasjs.min';
import { DateSliderPage } from '../date-slider/date-slider.page';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { DateProviderService } from 'src/app/services/date/date-provider.service';
import { ToastProvider } from 'src/app/services/toast/toast';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { IonSlides } from '@ionic/angular';




@Component({
  selector: 'app-water-tracker',
  templateUrl: './water-tracker.page.html',
  styleUrls: ['./water-tracker.page.scss'],
})
export class WaterTrackerPage implements OnInit {
  @ViewChild('graphSlider', { static: false }) graphSlider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };
  unitValue: number = 250;
  graphViewableDateText = "Last 7 days"
  currentData = {
    wt_goal: 8,
    wt_achived: 0,
    wt_date: "",
    wt_unit: 250
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

    // this.renderChart();
    this.getWaterDataofOneMonth()
    // this.postDataByDate();
  }
  getWaterDataofOneMonth() {
    this.loadingContollerService.loadingPresent();
    this.dateProviderService.getOneMonthdatelimits('water').then(oneMonthBalnkData => {
      console.log(oneMonthBalnkData);
      this.fromDate = oneMonthBalnkData[0]['wt_date']
      const payload = {
        "from_date": oneMonthBalnkData[0]['wt_date'],
        "to_date": oneMonthBalnkData[oneMonthBalnkData["length"] - 1]['wt_date'],
        "wt_cid": Number(localStorage.getItem("c_id"))
      }
      this.apiService.post(payload, "/waterTracker/search").subscribe(data => {
        if (data['date']["length"] > 0) {
          for (let i = 0; i < data['date']["length"]; i++) {
            this.updateDatailMainArray(data['date'][i], oneMonthBalnkData, false);
          }
        }
        this.oneMonthData = oneMonthBalnkData
        this.plotGraph()
        console.log(this.oneMonthData);
        //this.oneMonthData = data['date'];
        this.loadingContollerService.loadingDismiss();
        this.currentData = this.getTodaysData(payload.to_date);
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
      wt_goal: 8,
      wt_achived: 0,
      wt_date: date_string,
      wt_unit: 250
    }
    this.oneMonthData.filter(data => {
      if (data.wt_date === date_string) {
        currentData.wt_date = date_string;
        currentData.wt_goal = data.wt_goal;
        currentData.wt_achived = data.wt_achived;
        currentData.wt_unit = data.wt_unit
      }
      return currentData;
    });
    return currentData;
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async openActionSheet() {
    const presentModel = await this.modalController.create({
      component: AddWaterComponentPage,
      componentProps: {
        currentGoal: this.currentData.wt_goal,
        currentUnit: this.currentData.wt_unit
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'action-sheet-component'
    });

    presentModel.onWillDismiss().then((data) => {
      if (data.data) {
        this.currentData.wt_goal = data.data.goal;
        this.currentData.wt_unit = data.data.unitValue;
        this.postDataByDate(0);
      }
      //custom code
    });

    return await presentModel.present();

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
        selectedDate: this.currentData.wt_date
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isDateSliderOpened = false;
        if (data.data) {
          this.currentData.wt_date = data.data.dateFormatted;
          this.currentData  = this.getTodaysData(data.data.dateFormatted);
          if (!(data.data.isToday)) {
            this.selectedActiveDateFormat = (data.data.pageText);
          } else {
            this.selectedActiveDateFormat = "Today";
          }
        }
      });
    return await modal.present();
  }

  postDataByDate(value) {
    if (this.currentData.wt_goal === 0) {
      this.toastProvider.presentToast('Please add any goal first');
      return;
    }
    this.currentData.wt_achived = Number(this.currentData.wt_achived) + value;
    if (this.currentData.wt_achived < 0) {
      this.currentData.wt_achived = 0;
      return
    }
    if (this.currentData.wt_achived == this.currentData.wt_goal) {
      this.toastProvider.presentToast("Hurray... You have achived goal");
    }
    const payload = {
      "wt_date": this.currentData.wt_date,
      "wt_goal": Number(this.currentData.wt_goal),
      "wt_achived": Number(this.currentData.wt_achived),
      "wt_cid": Number(localStorage.getItem("c_id")),
      "wt_unit": Number(this.currentData.wt_unit)
    }
    if (this.addDataSubscribe) {
      this.addDataSubscribe.unsubscribe();
    }
    this.updateDatailMainArray(payload, this.oneMonthData, true)
    this.addDataSubscribe = this.apiService.post(payload, '/waterTracker/addupdate').subscribe((response: any) => {
     
    }, (error) => {
    });
  }

  updateDatailMainArray(record, addArray, updateGraph) {
    for (let i = 0; i < addArray.length; i++) {
      if (addArray[i].wt_date === record.wt_date) {
        addArray[i].wt_goal = record.wt_goal;
        addArray[i].wt_achived = record.wt_achived;
        break;
      }
    }
     console.log(this.graphDatatoPlot);
    if(updateGraph){
      for( let i= 0; i < this.graphDatatoPlot.length; i++){
        for(let j = 0; j < this.graphDatatoPlot[i]['plotConsumed'].length; j++){
          if(this.graphDatatoPlot[i]['plotConsumed'][j].date === record.wt_date){
            this.chart[i].options.data[0].dataPoints[j].y = record.wt_goal; 
            this.chart[i].options.data[1].dataPoints[j].y = record.wt_achived; 
            this.chart[i].render();
            break;
          }
        }
      }
    }
  }

  slideChanged(e) {
    this.graphSlider.getActiveIndex().then(index => {
      if(index !== 3){
        this.graphViewableDateText = this.graphDatatoPlot[3-index].plotConsumed[0].label + " - " + this.graphDatatoPlot[3-index].plotConsumed[6].label;
      }else{
        this.graphViewableDateText = "Last 7 days";
      }
    });
  }

  plotGraph() {
    let plotConsumed = [];
    let plotGoal = [];
    let count = 4;
    for (let i = this.oneMonthData.length - 1; i >= 0; i--) {
      const dataConsumed = {
        label: this.oneMonthData[i].wt_date_graphFormat,
        y: this.oneMonthData[i].wt_achived,
        date: this.oneMonthData[i].wt_date
      }
      const dataGoal = {
        label: "",
        y: this.oneMonthData[i].wt_goal,
        date: this.oneMonthData[i].wt_date
      }
      if (plotConsumed.length < 7) {
        plotConsumed.push(dataConsumed);
        plotGoal.push(dataGoal)
      } else {
        const arrt1 = plotConsumed;
        const arr2 = plotGoal;
        const graphdata = {
          plotGoal: plotGoal.reverse(),
          plotConsumed: plotConsumed.reverse()
        }
        const tempCount = count;
        this.graphDatatoPlot.push(graphdata)
        plotConsumed = [];
        plotGoal = [];
        setTimeout(() => {
          this.renderChart(arrt1, arr2, tempCount);
        }, 100);
        plotConsumed.push(dataConsumed);
        this.graphSlider.slideTo(3);
        plotGoal.push(dataGoal);
        count = count - 1
      }
    }
  }

  renderChart(arrt1, arr2, i) {
    console.log(arrt1,arrt1,i);
    let chartPart = new CanvasJS.Chart("chartContainer" + i, {
      dataPointWidth: 15,
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
        minimum: 0,
        viewportMinimum: 0,
        maximun: 12,
        viewportMaximum: 12,
        labelFormatter: function () {
          return " ";
        }
      }
      ,

      data: [
        {
          type: "column",
          legendText: "Goal",
          showInLegend: true,
          color: "#D1ECFF",
          indexLabel: "{y}",
          indexLabelFontSize: 15,
          dataPoints:
            arr2
          ,

        },
        {
          type: "column",
          legendText: "Consumed Water",
          showInLegend: true,
          indexLabel: "{y}",
          indexLabelFontSize: 15,
          color: "#86CEFF",
          dataPoints:arrt1
        }
      ]
    });
    chartPart.render();
    this.chart.push(chartPart);
  }




}
