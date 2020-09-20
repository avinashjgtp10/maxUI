import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router,ActivatedRoute } from "@angular/router"
import { ApiCallService } from "../../services/api/api-call.service";
import { IonSlides } from '@ionic/angular';
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { TrainingDashboardPage } from '../training-dashboard/training-dashboard.page';

@Component({
  selector: 'app-getting-started-training',
  templateUrl: './getting-started-training.page.html',
  styleUrls: ['./getting-started-training.page.scss'],
})
export class GettingStartedTrainingPage implements OnInit {
  loginSliderOpts = {
    speed: 400,
    preloadImages: true,
    allowTouchMove: false,
  };
  result:any
  @ViewChild('loginSlider', { static: false }) loginSlider: IonSlides;
  slideIndex: number = 1;
  totalSlides: number = 5;
  slideProgress: number = 0;
  dataObj = {
    "objective":"",
    "fitnesslevel":"",
    "weeks":"",
    "oftenweek":"",
    "cid": localStorage.getItem('c_id'),
    "plan":"standard"
  };
  constructor(
    private route:Router,public modalController: ModalController,
    private apiCallService: ApiCallService,
    private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.loginSlider.update();
    this.slideProgress = this.slideIndex/ this.totalSlides;
  }
 setData(key, value){
   this.dataObj[key] = value;
   if(this.slideIndex === (this.totalSlides-1)){
      this.storeAllInfo();
   } else {
    this.slideToNext();
   }
  
 }
 storeAllInfo(){
  this.loadingContollerService.loadingPresent();
  this.apiCallService.gettingStartedData(this.dataObj).subscribe((result:any) =>{
    this.loadingContollerService.loadingDismiss();
    console.log('result',result);
    this.result = result;
    this.slideToNext();
  })
 }
  slideToNext(){
    this.loginSlider.slideNext(400);
    this.slideIndex = this.slideIndex + 1;
    this.slideProgress = this.slideIndex/ this.totalSlides;
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async goToTrainigDasboard(){
    const modal = await this.modalController.create({
      component: TrainingDashboardPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }
}
