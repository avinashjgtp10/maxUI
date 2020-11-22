import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ModalController, NavController } from '@ionic/angular';
import { CalendarSelectionPage } from '../calendar-selection/calendar-selection.page';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { TrainingOverviewPage } from '../training-overview/training-overview.page';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.page.html',
  styleUrls: ['./training-dashboard.page.scss'],
})
export class TrainingDashboardPage implements OnInit {
  @ViewChild('offersSlider', { static: false }) offersSlider: IonSlides;
  public items: any = [];
  completeData:any;
  isPlaying:boolean = false;
  playingVideoSrc:string;
  liveClassesData: Array<Object> = [];
  specialPlanesData: Array<Object> = [];
  offersOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3.5
  };
  myTraining:string=""
  myWeek:string = ""

  constructor(public modalController: ModalController,
    private apiCallService: ApiCallService,
    private route: ActivatedRoute,
    private navCtrl:NavController,
    private loadingContollerService: LoadingContollerService) {
   }
   ionViewWillEnter(){
    this.offersSlider.update();
   
  }
  ngAfterViewInit(){
  }
  ngOnInit() {
    this.loadingContollerService.loadingPresent();
    this.apiCallService.getMyTrainingDashboardData(localStorage.getItem('c_id')).subscribe((data:any) =>{
      this.completeData = data.data;
      this.myTraining = this.completeData.training.mt_objective;
      this.myWeek = this.completeData.training.mt_weeks;  

      this.loadingContollerService.loadingDismiss();
      this.liveClassesData = data.data.image;
      this.playingVideoSrc = this.completeData.video[1].aw_url;
      console.log('this.playingVideoSrc',this.playingVideoSrc);
    })
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
  }
  closeModal(refresh = false) {
    this.navCtrl.back()
  }
  async startWorkout(){
    const modal = await this.modalController.create({
      component: CalendarSelectionPage,
      cssClass: 'calendar-modal-component'
    });
    return await modal.present();
  }
  start(){
    if(this.completeData.isStarted){
      this.startOverview();
    } else {
      this.startWorkout();
    }
  }
  playVideo(event: any) {
    let myVideo: any = document.getElementById("video_1");
    if (myVideo.paused) {
      myVideo.play();
      this.isPlaying = true;
    } 
    else {
      myVideo.pause();
      this.isPlaying = false;
    }
  }
  async startOverview(){
    const modal = await this.modalController.create({
      component: TrainingOverviewPage,
      cssClass: ''
    });
    return await modal.present();
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
