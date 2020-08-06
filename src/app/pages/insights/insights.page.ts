import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as HighCharts from 'highcharts';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  selectedSegment: any = 'all-meals';
  segmentData: any = [];
  myChart: any
  constructor() { }

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
  ngAfterViewInit() {
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
        categories: ['Sun/26', 'Mon/27', 'Tue/28', 'Wed/29', 'Thu/30', 'Fri/31', 'Sat/01'],
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
          data: [45, 55, 69, 74, 91, 15, 32]
        }
      ]
    });
    this.myChart.setSize(400, 300);
  }

  segmentChanged(e) {
   this.myChart.series[0].update({
      name: '',
      type: undefined,
      data: [15, 35, 19, 90, 45, 10, 32]
   });
  }

}
