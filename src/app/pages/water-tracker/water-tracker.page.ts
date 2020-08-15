import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AddWaterComponentPage } from './add-water-component/add-water-component.page';
import * as CanvasJS from './../../../assets/lib/canvasjs.min';
import { DateSliderPage } from '../date-slider/date-slider.page';


@Component({
  selector: 'app-water-tracker',
  templateUrl: './water-tracker.page.html',
  styleUrls: ['./water-tracker.page.scss'],
})
export class WaterTrackerPage implements OnInit {
  waterChart: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 7,
    speed: 400
  };

  selectedActiveDateFormat: string = "Today";
  selectedDate;

 

  constructor(private modalController:ModalController,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.plotChart({
      "data": [15, 35, 19 ],
      "legends": [15, 35, 19]
    },{
      "data": [20, 35, 30],
      "legends": [15, 35, 19]
    }
    )
    this.renderChart();
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async openActionSheet(){
      const presentModel = await this.modalController.create({
        component: AddWaterComponentPage,
        componentProps: {
          title: 'Billing Address',
          type:'billing',
        },
        showBackdrop: true,
        mode: "ios",
        cssClass: 'action-sheet-component'
      });
  
      presentModel.onWillDismiss().then((data)=>{
        console.log(data);
        //custom code
      });
  
      return await presentModel.present();
    
  }

  plotChart(chart, chart1){
  //   let chart = Highcharts.chart('container', {
  //     chart: {
  //         type: 'column'
  //     },
  //     title: {
  //         text: 'Summer Olympics 2016 - Top 5 countries by Gold medals'
  //     },
  //     subtitle: {
  //         text: 'Comparing to results from Summer Olympics 2012 - Source: <ahref="https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table">Wikipedia</a>'
  //     },
  //     plotOptions: {
  //         series: {
  //             grouping: false,
  //             borderWidth: 0
  //         }
  //     },
  //     legend: {
  //         enabled: false
  //     },
  //     tooltip: {
  //         shared: true,
  //         headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
  //         pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} medals</b><br/>'
  //     },
  //     xAxis: {
  //         type: 'category',
  //         max: 4,
  //         labels: {
  //             useHTML: true,
  //             animate: true,
  //             formatter: function () {
  //                 var value = this.value,
  //                     output;
  
  //                 countries.forEach(function (country) {
  //                     if (country.name === value) {
  //                         output = country.flag;
  //                     }
  //                 });
  
  //                 return '<span><img src="https://image.flaticon.com/icons/svg/197/' + output + '.svg" style="width: 40px; height: 40px;"/><br></span>';
  //             }
  //         }
  //     },
  //     yAxis: [{
  //         title: {
  //             text: 'Gold medals'
  //         },
  //         showFirstLabel: false
  //     }],
  //     series: [{
  //         color: 'rgb(158, 159, 163)',
  //         pointPlacement: -0.2,
  //         linkedTo: 'main',
  //         data: dataPrev[2016].slice(),
  //         name: '2012'
  //     }, {
  //         name: '2016',
  //         id: 'main',
  //         dataSorting: {
  //             enabled: true,
  //             matchByName: true
  //         },
  //         dataLabels: [{
  //             enabled: true,
  //             inside: true,
  //             style: {
  //                 fontSize: '16px'
  //             }
  //         }],
  //         data: getData(data[2016]).slice()
  //     }],
  //     exporting: {
  //         allowHTML: true
  //     }
  // });
  
  // var years = [2016, 2012, 2008, 2004, 2000];
  
  // years.forEach(function (year) {
  //     var btn = document.getElementById(year);
  
  //     btn.addEventListener('click', function () {
  
  //         document.querySelectorAll('.buttons button.active').forEach(function (active) {
  //             active.className = '';
  //         });
  //         btn.className = 'active';
  
  //         chart.update({
  //             title: {
  //                 text: 'Summer Olympics ' + year + ' - Top 5 countries by Gold medals'
  //             },
  //             subtitle: {
  //                 text: 'Comparing to results from Summer Olympics ' + (year - 4) + ' - Source: <ahref="https://en.wikipedia.org/wiki/' + (year) + '_Summer_Olympics_medal_table">Wikipedia</a>'
  //             },
  //             series: [{
  //                 name: year - 4,
  //                 data: dataPrev[year].slice()
  //             }, {
  //                 name: year,
  //                 data: getData(data[year]).slice()
  //             }]
  //         }, true, false, {
  //             duration: 800
  //         });
  //     });
  // });
  }
  titleFormat(){
    console.log('hi');
  }
 

 getData(data) {
    return data.map(function (country, i) {
        return {
            name: country[0],
            y: country[1],
            color: this.countries[i].color
        };
    });
}

renderChart() {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: ""
    },	
   
     dataPointWidth: 150,
    axisY: {
          title: "",
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function(){
            return " ";
          }  
    },
    axisY2: {
          title: "",
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function(){
            return " ";
          }  
    },	
 
    legend: {
      cursor:"pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      indexLabel: "8",
      indexLabelFontSize: 26,
      indexLabelPlacement: "inside",
      type: "column",
      legendText: "",
      showInLegend: true, 
      color: "gray",
      dataPoints:[
        { label: "Saudi", y: 12 }
       
      
      
      ]
    },
    {
      type: "column",	
      name: "",
      legendText: "",
      indexLabel: "8",
      indexLabelPlacement: "inside",
      indexLabelFontSize: 26,
      axisYType: "secondary",
      showInLegend: true,
      color: "blue",
      dataPoints:[
        { label: "Saudi", y: 10  }
       
     
       
      ]
    }]
  });
  chart.render();
  
  

  // Show Default Text
  var chartName = "chartContainer1";
  var chart = new CanvasJS.Chart(chartName, {
    animationEnabled: true,
    title:{
      text: ""
    },	
     dataPointWidth: 150,
    axisY: {
          title: "",
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function(){
            return " ";
          }  
    },
    axisY2: {
          title: "",
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function(){
            return " ";
          }  
    },	
  
    legend: {
      cursor:"pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      type: "column",
      legendText: "",
      showInLegend: true, 
      dataPoints:[
        { label: "Saudi", y: 12}
       
      
      
      ]
    },
    {
      type: "column",	
      name: "",
      legendText: "",
      axisYType: "secondary",
      showInLegend: true,
          dataPointWidth: 2,
      dataPoints:[
        { label: "Saudi", y: 10  }
       
     
       
      ]
    }]
  });
  chart.render();
  
  function toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}
openDateSlide(){
  this.openDateSlider();
}
async openDateSlider() {
  const modal = await this.modalController.create({
    component: DateSliderPage,
    cssClass: 'date-slider-component',
    componentProps: {
      fromDate: '01/07/2020',
      toDate: undefined,
      selectedDate: this.selectedDate
   }
  });
    modal.onDidDismiss()
    .then((data) => {
      if(data.data){
        this.selectedDate = data.data.dateFormatted;
      if(!(data.data.isToday)){
        this.selectedActiveDateFormat = (data.data.pageText);
      }else{
        this.selectedActiveDateFormat = "Today";
      }
      }
    });
  return await modal.present();
}

 

}
