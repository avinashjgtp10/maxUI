import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AddWaterComponentPage } from './add-water-component/add-water-component.page';
import * as CanvasJS from './../../../assets/lib/canvasjs.min';
import { DateSliderPage } from '../date-slider/date-slider.page';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { DateProviderService } from 'src/app/services/date/date-provider.service';
import { ToastProvider } from 'src/app/services/toast/toast';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';





@Component({
  selector: 'app-water-tracker',
  templateUrl: './water-tracker.page.html',
  styleUrls: ['./water-tracker.page.scss'],
})
export class WaterTrackerPage implements OnInit {
  waterChart: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };

  currentData = {
    wt_goal : 8,
    wt_achived: 0,
    wt_date: ""
  }
  addDataSubscribe;
  oneMonthData;
  fromDate: string;
  GraphDatatoPlot = [];

  isDateSliderOpened: boolean = false;

  selectedActiveDateFormat: string = "Today";
  selectedDate;

 

  constructor(private modalController:ModalController,
              private actionSheetController: ActionSheetController,
              private apiService: ApiCallService,
              private dateProviderService: DateProviderService,
              private toastProvider: ToastProvider,
              private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {
  
   // this.renderChart();
   this.getWaterDataofOneMonth()
   // this.postDataByDate();
  }
  getWaterDataofOneMonth(){
    this.loadingContollerService.loadingPresent();
     this.dateProviderService.getOneMonthdatelimits().then(oneMonthBalnkData =>{
       this.fromDate = oneMonthBalnkData[0]['wt_date']
       const payload = {
         "from_date": oneMonthBalnkData[0]['wt_date'],
         "to_date": oneMonthBalnkData[oneMonthBalnkData["length"]-1]['wt_date'],
         "wt_cid": Number(localStorage.getItem("c_id"))
       }
       this.apiService.post(payload, "/waterTracker/search").subscribe(data => {
         if(data['date']["length"] > 0){
          for(let i = 0; i < data['date']["length"] ; i++){
            this.updateDatailMainArray(data['date'][i], oneMonthBalnkData);
           }
         }
         this.oneMonthData = oneMonthBalnkData
         this.plotGraph()
         //this.oneMonthData = data['date'];
         this.loadingContollerService.loadingDismiss();
         this.currentData = this.getTodaysData(payload.to_date);
       },(error) => {
        this.loadingContollerService.loadingDismiss();
        this.toastProvider.presentToast('Ooops... Error in getting data');
       })
     },(error) => {
      this.toastProvider.presentToast('Ooops... Error in getting dates')
      this.loadingContollerService.loadingDismiss();
     })
  }
  getDataByDate(date){
    //this.loadingContollerService.loadingPresent();
       const payload = {
         "from_date": date,
         "to_date": date,
         "wt_cid": localStorage.getItem("c_id")
       }
      this.currentData = this.getTodaysData(date);
      //  this.apiService.post(payload, "/waterTracker/search").subscribe(data => {
      //    console.log(data);
      //    this.loadingContollerService.loadingDismiss();
      //    if(data["date"].length > 0){
      //     this.currentData.wt_goal = data["date"][0].wt_goal;
      //     this.currentData.wt_achived = data["date"][0].wt_achived;
      //    }else{
      //      this.currentData.wt_goal = 0;
      //      this.currentData.wt_achived = 0;
      //    }
      //  },(error) => {
      //   this.loadingContollerService.loadingDismiss();
      //   this.toastProvider.presentToast('Ooops... Error in getting data');
      //  })
     
  }
  getTodaysData(date_string){
    const currentData = {
      wt_goal : 8,
      wt_achived: 0,
      wt_date: date_string
    }
    this.oneMonthData.filter(data => {
       if(data.wt_date === date_string){
          currentData.wt_date = date_string;
          currentData.wt_goal = data.wt_goal;
          currentData.wt_achived = data.wt_achived;
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
  async openActionSheet(){
      const presentModel = await this.modalController.create({
        component: AddWaterComponentPage,
        componentProps: {
          currentGoal: this.currentData.wt_goal
        },
        showBackdrop: true,
        mode: "ios",
        cssClass: 'action-sheet-component'
      });
  
      presentModel.onWillDismiss().then((data)=>{
        if(data.data){
          this.currentData.wt_goal = data.data;
          this.postDataByDate(0);
        }
        //custom code
      });
  
      return await presentModel.present();
    
  }

openDateSlide(){
  this.openDateSlider();
}
openDateSlider(){
  if(!this.isDateSliderOpened){
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
      if(data.data){
        this.currentData.wt_date = data.data.dateFormatted;
        this.getDataByDate(data.data.dateFormatted);
      if(!(data.data.isToday)){
        this.selectedActiveDateFormat = (data.data.pageText);
      }else{
        this.selectedActiveDateFormat = "Today";
      }
      }
    });
  return await modal.present();
}

 postDataByDate(value){
   if(this.currentData.wt_goal === 0){
     this.toastProvider.presentToast('Please add any goal first');
     return;
   }
   this.currentData.wt_achived = Number(this.currentData.wt_achived) + value;
   if(this.currentData.wt_achived < 0){
    this.currentData.wt_achived = 0;
     return
   } 
   if(this.currentData.wt_achived == this.currentData.wt_goal){
     this.toastProvider.presentToast("Hurray... You have achived today's goal");
   } 
   const payload = {
    "wt_date":this.currentData.wt_date,
    "wt_goal":Number(this.currentData.wt_goal),
    "wt_achived":Number(this.currentData.wt_achived),
    "wt_cid":Number(localStorage.getItem("c_id"))
   }
   if(this.addDataSubscribe){
    this.addDataSubscribe.unsubscribe();
   }
  this.addDataSubscribe = this.apiService.post(payload, '/waterTracker/addupdate').subscribe((response: any) => {
    this.updateDatailMainArray(response.date, this.oneMonthData)
  }, (error) => {
  });
 }

 updateDatailMainArray(record, addArray){
   for(let i=0; i < addArray.length; i++){
     if(addArray[i].wt_date === record.wt_date){
      addArray[i].wt_goal = record.wt_goal;
      addArray[i].wt_achived = record.wt_achived;
     }else{
      addArray.push(record);
     }
   }
 }

 plotGraph(){
   let plotGraph = [];
   let partArray1 = [];
   let partArray2 = [];
  let  count = 0;
   for(let i = this.oneMonthData.length-1; i >= 0; i--){
     const dataConsumed = {
       label: this.oneMonthData[i].wt_date_graphFormat,
       y: this.oneMonthData[i].wt_achived
     }
     const dataGoal = {
      label: "",
      y:this.oneMonthData[i].wt_goal
    }
        if(partArray1.length < 7){
          partArray1.push(dataConsumed);
          partArray2.push(dataGoal)
        }else{

          
          plotGraph.push(partArray1);
          partArray1 = [];
          partArray1.push(dataConsumed);
          partArray2 = [];
          partArray2.push(dataGoal);
          count = count + 1
        }
   }
   
  //  setTimeout(()=> {
  //   this.renderChart(plotGraph, );
  // }, 2000);
   this.GraphDatatoPlot = plotGraph;

   setTimeout(()=> {
    this.renderChart()
}, 500);
 }

 renderChart() {
  

    var chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
    title:{
      text: ""
    },	
    legend:{
      fontSize: 20,
     },
    axisY: {
      title: "",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
      labelFormatter: function(){
        return " ";
      } 
    },
    axisY2: {
      title: "",
      titleFontColor: "#C0504E",
      lineColor: "#C0504E",
      labelFontColor: "#C0504E",
      tickColor: "#C0504E",
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
      labelFormatter: function(){
        return " ";
      } 
    },	
      axisX: {
        title: "",
         labelFontSize: 18,
         gridThickness: 0,
         tickLength: 0,
         lineThickness: 0,
         labelFontStyle: "normal"
         
   },
    
  
    
    data: [{
      type: "column",
      name: "Goal",
      legendText: "Goal",
      showInLegend: true, 
      color: "#E02828",
      indexLabel: "{y}",
      indexLabelFontSize: 15,
      dataPoints:[
        { label: "mon 19", y: 8 },
        { label: "tue 20", y: 8 },
        { label: "wed 21", y: 8 },
        { label: "thu 22", y: 8 },
        { label: "fri 23", y: 8 },
        { label: "sat 24", y: 8 },
        { label: "sun 25", y: 8 },
      ]
    },
    {
      type: "column",	
      name: "Consumed Water",
      legendText: "Consumed Water",
        showName:false,
      axisYType: "secondary",
      showInLegend: true,
      indexLabel: "{y}",
      indexLabelFontSize: 15,
      color: "gray",
      dataPoints:[
        { label: "", y: 6 },
        { label: "", y: 5 },
        { label: "", y: 4 },
        { label: "", y: 3 },
        { label: "", y: 2 },
        { label: "", y: 1 },
        { label: "", y: 7 },
      ]
    }
  
  ]
    });
  
  
chart.render();
  }


 

}
