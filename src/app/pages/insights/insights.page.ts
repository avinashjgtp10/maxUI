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
  selectedSegment: any = 'breakfast';
  segmentData: any = [];
  myChart: any
  constructor(public modalController: ModalController,
    public apiService: ApiCallService,  
    public chartCalcService: ChartCalculationsService,  
    public loadingService: LoadingContollerService) { }

  ngOnInit() {
    this.segmentData = [{
      segmentName: 'All Meals',
      segmentValue: 'all-meals'
    },
    {
      segmentName: 'Breakfast',
      segmentValue: 'breakfast'
    },
    {
      segmentName: 'Morning Snack',
      segmentValue: 'morning-snack'
    },
    {
      segmentName: 'Lunch',
      segmentValue: 'lunch'
    },
    {
      segmentName: 'Evening Snack',
      segmentValue: 'evening-snack'
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
   this.apiService.getUserFoodData(fromDate,toDate,localStorage.getItem('c_id')).subscribe((response: any) => {
     this.chartCalcService.getCalculatedChartData(response,this.selectedSegment,7).then((data)=>{
      console.log('data',data);
      this.plotChart(data);
      this.loadingService.loadingDismiss();
     }).catch((err)=>{

     })
     console.log('response',response);
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
        itemDistance: 10,
        title: {
          text: ''
        },
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
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
        categories: chart.legends,
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
          color: '#F6F6F6'
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
    this.myChart.setSize(400, 300);
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  segmentChanged(e) {
   this.myChart.series[0].update({
      name: '',
      type: undefined,
      data: [15, 35, 19, 90, 45, 10, 32]
   });
  }

}
