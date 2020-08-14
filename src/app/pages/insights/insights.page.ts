import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as HighCharts from 'highcharts';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from "../../services/api/api-call.service";
import { ChartCalculationsService } from "../../services/chart/chart-calculations.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { DateProviderService } from "../../services/date/date-provider.service";
import * as moment from 'moment';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  @Input() allEstimatedData: any;
  selectedSegment: any = 'all_meals';
  segmentData: any = [];
  dateRange: number = 7;
  mealPercetage: any = {
    'breakfast': 0.25,
    'morning_snack': 0.12,
    'lunch':0.25,
    'evening_snack': 0.12,
    'dinner': 0.25
  }
  otherMealfactor: number = 0.25; /// 25% divided for other meals
  aggragatedFoodData: any = [];
   calorieConsumed: number = 0;
   fatConsumed: number = 0;
   fiberConsumed: number = 0;
   proteinsConsumed: number = 0;
   carbsConsumed: number = 0;
   calorieEstimated: number = 0;
   fatEstimated: number = 0;
   fiberEstimated: number = 0;
   proteinsEstimated: number = 0;
   carbsEstimated: number = 0;
   calorieBar: number = 0;
   fatBar: number = 0;
   fiberBar: number = 0;
   proteinBar: number = 0;
   carbsBar: number = 0;
  myChart: any
  constructor(public modalController: ModalController,
    public apiService: ApiCallService,
    public dateService: DateProviderService,  
    public chartCalcService: ChartCalculationsService,  
    public loadingService: LoadingContollerService) { }

  ngOnInit() {
    this.segmentData = [{
      segmentName: 'All Meals',
      segmentValue: 'all_meals'
    },
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
    this.loadingService.loadingPresent();
    let toDate = moment().format('DD/MM/YYYY');
    let fromDate = moment().subtract(this.dateRange, 'days').format('DD/MM/YYYY');
   this.apiService.getUserFoodData(toDate,fromDate,localStorage.getItem('c_id')).subscribe((response: any) => {
     this.aggragatedFoodData = response;
     this.chartCalcService.getCalculatedChartData(this.aggragatedFoodData,this.selectedSegment,7).then((data)=>{
        this.plotChart(data);
        this.mapPrgressBarValues(data);
        this.loadingService.loadingDismiss();
     }).catch((err)=>{
      this.loadingService.loadingDismiss();
     })
   }, (error) => {
     this.loadingService.loadingDismiss();
     console.log("error",error);
   });
  }
  mapPrgressBarValues(data){
    console.log('data',data);
    console.log('allEstimatedData',this.allEstimatedData);
    this.calorieConsumed = (data.calorieConsumed).toFixed(2);
    this.fatConsumed = (data.fatConsumed).toFixed(2);
    this.fiberConsumed = (data.fiberConsumed).toFixed(2);
    this.proteinsConsumed = (data.proteinsConsumed).toFixed(2);
    this.carbsConsumed =  (data.carbsConsumed).toFixed(2);
    if(this.selectedSegment === 'all_meals') {
      this.calorieEstimated = (this.allEstimatedData.calorieEstimate).toFixed(2) * this.dateRange;
      this.fatEstimated = (this.allEstimatedData.fatsEstimate).toFixed(2) * this.dateRange;
      this.fiberEstimated = (this.allEstimatedData.fiberEstimate).toFixed(2) * this.dateRange;
      this.proteinsEstimated = (this.allEstimatedData.proteinEstimate).toFixed(2) * this.dateRange;
      this.carbsEstimated =  (this.allEstimatedData.carbsEstimate).toFixed(2) * this.dateRange;
    } else {
    this.calorieEstimated = (this.allEstimatedData.calorieEstimate).toFixed(2) * this.dateRange * this.mealPercetage[this.selectedSegment];
    this.fatEstimated = (this.allEstimatedData.fatsEstimate).toFixed(2) * this.dateRange * this.mealPercetage[this.selectedSegment];
    this.fiberEstimated = (this.allEstimatedData.fiberEstimate).toFixed(2) * this.dateRange * this.mealPercetage[this.selectedSegment];
    this.proteinsEstimated = (this.allEstimatedData.proteinEstimate).toFixed(2) * this.dateRange * this.mealPercetage[this.selectedSegment];
    this.carbsEstimated =  (this.allEstimatedData.carbsEstimate).toFixed(2) * this.dateRange * this.mealPercetage[this.selectedSegment];
    }
    this.progressBarCalculation();
         
  }
  progressBarCalculation() {
     this.calorieBar = this.calorieConsumed / this.calorieEstimated;
     this.fatBar = this.fatConsumed / this.fatEstimated;
     this.fiberBar = this.fiberConsumed / this.fiberEstimated;
     this.proteinBar = this.proteinsConsumed / this.proteinsEstimated;
     this.carbsBar = this.carbsConsumed / this.carbsEstimated;
  }
  plotChart(chart){
    this.myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      legend: {
        itemDistance: 8,
        title: {
          text: ''
        },
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 400,
            maxHeight: 450,
          },
          // Make the labels less space demanding on mobile
          chartOptions: {
            xAxis: {
              labels: {

              }
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -2
              },
              title: {
                text: ''
              }
            }
          }
        }]
      },
      xAxis: {
        categories: chart.formattedLegends,
        title: {
          text: ''
        },
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: ''
        },
        gridLineWidth: 0,
      },
      plotOptions: {
        column: {
          pointWidth: 30,
          color: '#A5A5A5'
        },
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          },
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: '',
          type: undefined,
          data: chart.data
        }
      ]
    });
   // this.myChart.setSize(350, 400);
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  segmentChanged(e) {
    //this.loadingService.loadingPresent();
    this.chartCalcService.getCalculatedChartData(this.aggragatedFoodData,this.selectedSegment,7).then((chartData:any)=>{
      console.log('chartData',chartData);
      this.mapPrgressBarValues(chartData);
      this.myChart.series[0].update({
      data: chartData.data
      });
     // this.loadingService.loadingDismiss();
     }).catch((err)=>{
     });
  }

}
