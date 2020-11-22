import { Component, OnInit } from '@angular/core';
import { ModalController,NavController } from '@ionic/angular';
import { DaySchedulePage } from '../day-schedule/day-schedule.page';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { WorkOutVideoPage } from '../work-out-video/work-out-video.page';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';


@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.page.html',
  styleUrls: ['./training-overview.page.scss'],
})
export class TrainingOverviewPage implements OnInit {
  public items: any = [];
  selectedSegment: any = 'Overview';
  aboutText:string = '';
  benefitsText:string = '';
  bgImage:string = '';
  constructor(public modalController: ModalController,
    private navCtrl:NavController,
    private route: Router,
    private apiCallService: ApiCallService,
    private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {
    this.loadingContollerService.loadingPresent();
    this.apiCallService.getMyTrainingOverviewData(localStorage.getItem('c_id')).subscribe((data:any) =>{
      this.loadingContollerService.loadingDismiss();
      console.log('data',data);
      this.benefitsText = data.data.overview[0].benefits;
      this.aboutText = data.data.overview[0].about;
      this.items = data.data.workouttracker;
      this.bgImage = data.data.overviewImage;
    })
  }
  segmentChanged(e) {
   }
   closeModal() {
    this.modalController.dismiss();
  }
  getDayCompleteData(item){
    this.loadingContollerService.loadingPresent();
    this.apiCallService.getDayWiseData(item.days,item.week,localStorage.getItem('c_id')).subscribe((data:any) =>{
      this.loadingContollerService.loadingDismiss();
       this.openVideo(data);
    })
  }
  async openVideo(item) {
    const modal = await this.modalController.create({
      component: WorkOutVideoPage,
      componentProps: {
        'playlistData': item.data,
        'weekDetails':item.weekDetails
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
   async openDaySchedule(item) {
    const modal = await this.modalController.create({
      component: DaySchedulePage,
      componentProps: {
        'scheduleData': item
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
