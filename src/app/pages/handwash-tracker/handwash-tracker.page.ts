import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCallService } from "../../services/api/api-call.service";
import * as CanvasJS from './../../../assets/lib/canvasjs.min';
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import * as moment from 'moment';
import { DateSliderPage } from '../date-slider/date-slider.page';
import { IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ChartCalculationsService } from "../../services/chart/chart-calculations.service";
import { DateProviderService } from 'src/app/services/date/date-provider.service';
import { ToastController } from '@ionic/angular';
import { Howl } from 'howler';

@Component({
  selector: 'app-handwash-tracker',
  templateUrl: './handwash-tracker.page.html',
  styleUrls: ['./handwash-tracker.page.scss'],
})
export class HandwashTrackerPage implements OnInit {
  @ViewChild('graphSlider', { static: false }) graphSlider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };
  chart = [];
  graphViewableDateText = "Last 7 days"
  htAchived:number = 0;
  htGoal: number = 16;
  mm = 0;
  ss = 0;
  ms = 0;
  chartData = [];
  isRunning = false;
  timerId: any = 0;
  player: Howl = null;
  isPlaying: boolean = false;
  isDateSliderOpened: boolean = false;
  selectedActiveDateFormat: string = "Today";
  selectedDate = moment().format('DD/MM/YYYY');
  today = moment().format('DD/MM/YYYY');
  currentData = {
    htGoal: 16,
    htAchived: 0,
    ht_date: ''
  }
  fromDate: any;
  yAc: any;
  yGo: any;
  constructor(public toastController: ToastController,
    public loadingService: LoadingContollerService,
    public modalController: ModalController,
    public chartCalcService: ChartCalculationsService,  
    private dateProviderService: DateProviderService,
    public apiService: ApiCallService) { }

  ngOnInit() {
    this.dateProviderService.getLast4WeekData().then((res)=>{
       this.chartCalcService.getHandWashChartData(res).then((result:any)=>{
        this.chartData = result.resultArr;
        this.yAc = result.yAc;
        this.yGo = result.yGo;
        this.chartData.forEach((x,i,a)=>{
          this.plotChart(this.yGo[i],this.yAc[i],a.length-i);
        }); 
        // for(let i = this.chartData.length-1; i<=0; i--){
        //   this.plotChart(this.yGo[i],this.yAc[i],this.chartData.length-i);
        // }
       })
    });
    this.today = moment().format('DD/MM/YYYY');
    this.fromDate = moment().subtract(1,'M').format('DD/MM/YYYY');
    this.getHandwasTrackerData(this.selectedDate);
    this.player = new Howl({
      src: ['./assets/mp3/hand_wash_sound.mp3'],
      html5: true,
      onplay: ()=> {
       this.isPlaying = true;
      },
      onend: ()=>{
        this.isPlaying = false;
        clearInterval(this.timerId);
        this.mm = 0;
        this.ms = 0;
        this.ss = 0;
        this.timerId = 0;
      }
    });
  }
  plotChart(yAc,yGo,i){
    let chartPart = new CanvasJS.Chart("chartContainer" + i, {
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
      },
      data: [
        {
          type: "column",
          legendText: "Goal",
          showInLegend: true,
          color: "#A5A5A5",
          indexLabel: "{y}",
          indexLabelFontSize: 15,
          dataPoints:yAc,
        },
        {
          type: "column",
          legendText: "Consumed Water",
          showInLegend: true,
          indexLabel: "{y}",
          indexLabelFontSize: 15,
          color: "#EBF4FA",
          dataPoints:yGo
        }
      ]
    });
    chartPart.render();
    this.graphSlider.slideTo(this.chartData.length-1);
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
            this.getHandwasTrackerData(this.selectedDate);
          } else {
            this.selectedActiveDateFormat = "Today";
            this.selectedDate = this.today;
            this.getHandwasTrackerData(this.selectedDate);
          }
        }
      });
    return await modal.present();
  }
 
  getHandwasTrackerData(date){
    this.loadingService.loadingPresent();
    let data = {
      to_date: date,
      from_date: date,
      ht_cid: localStorage.getItem('c_id')
    }
    this.apiService.searchHandwashTrackerData(data).subscribe((response: any) => {
      if(response.date && response.date.length) {
          this.htAchived = parseInt(response.date[0].ht_achived);
          this.htGoal = parseInt(response.date[0].ht_goal);
      } else {
        this.htAchived = 0;
        this.htGoal = 16;
      }
      this.loadingService.loadingDismiss();
    }, (error) => {
      this.loadingService.loadingDismiss();
      console.log("error",error);
    });
  }
  doSomethingWithCurrentValue(e){
    //console.log(e);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have reached todays goal of Handwash',
      duration: 3000
    });
    toast.present();
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  addHandWashEntry(){
    if(this.htAchived >= this.htGoal){
        this.presentToast();
    } else {
      let date = this.selectedDate;
      this.loadingService.loadingPresent();
      let data = {
        ht_date: date,
        ht_goal: this.htGoal,
        ht_achived: this.htAchived + 1,
        ht_cid: localStorage.getItem('c_id')
      }
      this.apiService.storeHandwashTrackerData(data).subscribe((responce:any)=>{
        this.htAchived = this.htAchived + 1;
        this.loadingService.loadingDismiss();
      }, (error)=>{
        console.log(error);
        this.loadingService.loadingDismiss();
      })
    }
  }
  clickHandler() {
    if (!this.isRunning && !this.isPlaying) {
      // Stop => Running
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms >= 100) {
          this.ss++;
          this.ms = 0;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0
        }
      }, 10);
      this.player.play();
    } else {
      clearInterval(this.timerId);
      if(this.isPlaying){
        this.player.pause();
        this.isPlaying = !this.isPlaying;
      }
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
}
