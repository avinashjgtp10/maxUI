import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { TrainingOverviewPage } from '../training-overview/training-overview.page';
@Component({
  selector: 'app-calendar-selection',
  templateUrl: './calendar-selection.page.html',
  styleUrls: ['./calendar-selection.page.scss'],
})
export class CalendarSelectionPage implements OnInit {
  @ViewChild('calendarSlider', { static: false }) calendarSlider: IonSlides;
  startDate:any;
  endDate:any;
  calendarOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false,
  };
  slectedDays:any = [];
  daysData=[{
    dayIndex:1,
    day:'Monday',
    shortName:'Mo',
    isSelected: false
  },{
    dayIndex:2,
    day:'Tuesday',
    shortName:'Tu',
    isSelected: false
  }, {
    dayIndex:3,
    day:'Wednesday',
    shortName:'We',
    isSelected: false
  },
  {
    dayIndex:4,
    day:'Thursday',
    shortName:'Th',
    isSelected: false
  },
  {
    dayIndex:5,
    day:'Friday',
    shortName:'Fr',
    isSelected: false
  },
  {
    dayIndex:6,
    day:'Saturday',
    shortName:'Sa',
    isSelected: false
  }]
  constructor(private apiCallService: ApiCallService,
    private loadingContollerService: LoadingContollerService,
    public modalController: ModalController) { }
  ionViewWillEnter(){
    this.calendarSlider.update();
  }
  ngOnInit() {
       this.startDate = moment().format('YYYY-MM-DD');
       this.endDate = moment().add(28, 'days').format('YYYY-MM-DD');
  }
  select(day){
    if (day.isSelected) {
      day.isSelected = false;
      this.daysData.forEach((v,i,a)=>{
        if(v.dayIndex === day.dayIndex){
          v.isSelected = false;
          this.slectedDays.push(v);
        }
      })
    } else {
       this.daysData.forEach((v,i,a)=>{
         if(v.dayIndex === day.dayIndex){
           v.isSelected = true;
         }
       })
    }
    console.log('this.daysData',this.daysData);
  }
  async goToTrainigOverview(){
    const modal = await this.modalController.create({
      component: TrainingOverviewPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }
  continue(){
    this.calendarSlider.getActiveIndex().then(index => {
      if(index===0){
        const selected = this.daysData.some((v,i,a)=>{
              return v.isSelected === true;
        });
        if(selected){
          this.calendarSlider.slideNext();
        } else {
          console.log('Please select Days');
        }
      } else {
        this.loadingContollerService.loadingPresent();
        let dayString = '';
        let split1  = this.startDate.split('-');
        split1 = split1.reverse().join('-');
        let split2  = this.endDate.split('-');
        split2 = split2.reverse().join('-');
        this.daysData.forEach((v,i,a)=>{
           if(v.isSelected){
             dayString = dayString.concat(v.shortName);
           }
        });
        let data = {
            w_startdate: split1,
            w_enddate: split2,
            w_workoutday: dayString,
            w_cid:localStorage.getItem('c_id')
        }
        this.apiCallService.workoutSchedule(data).subscribe((data:any) =>{
          this.loadingContollerService.loadingDismiss();
             this.goToTrainigOverview();
        })
      }
   });
  }

}
