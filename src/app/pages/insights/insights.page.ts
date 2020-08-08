import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as HighCharts from 'highcharts';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from "../../services/api/api-call.service";
import { ChartCalculationsService } from "../../services/chart/chart-calculations.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import * as moment from 'moment';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  selectedSegment: any = 'all_meals';
  segmentData: any = [];
  aggragatedFoodData: any = [];
  myChart: any
  constructor(public modalController: ModalController,
    public apiService: ApiCallService,  
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
    let fromDate = moment().subtract(7, 'days').format('DD/MM/YYYY')
   this.apiService.getUserFoodData(toDate,fromDate,localStorage.getItem('c_id')).subscribe((response: any) => {
     this.aggragatedFoodData = response;
     console.log('responce',response);
     this.chartCalcService.getCalculatedChartData(this.aggragatedFoodData,this.selectedSegment,7).then((data)=>{
      console.log('data',data);
      this.plotChart(data);
      this.loadingService.loadingDismiss();
     }).catch((err)=>{
      this.loadingService.loadingDismiss();
     })
   }, (error) => {
     this.loadingService.loadingDismiss();
     console.log("error",error);
   });
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
      this.myChart.series[0].update({
      data: chartData.data
      });
     // this.loadingService.loadingDismiss();
     }).catch((err)=>{
     });
  }

}
