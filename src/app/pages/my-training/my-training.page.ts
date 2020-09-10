import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { GettingStartedTrainingPage } from '../getting-started-training/getting-started-training.page';
import { SubcriptionModalPage } from '../subcription-modal/subcription-modal.page';
@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.page.html',
  styleUrls: ['./my-training.page.scss'],
})
export class MyTrainingPage implements OnInit {
  liveClassesData: Array<Object> = [];
  videoListData: any;
  specialPlanesData: Array<Object> = [];
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  @ViewChild('liveClassesSlider', { static: false }) liveClassesSlider: IonSlides;
  @ViewChild('offersSlider', { static: false }) offersSlider: IonSlides;
  liveClassesOpts = {
    initialSlide: 0,
    slidesPerView: 1.8,
    speed: 400
    };
    offersOpts = {
      initialSlide: 0,
      slidesPerView: 3.5,
      speed: 400
    };
  constructor(public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private apiCallService: ApiCallService,
    private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.loadingContollerService.loadingPresent();
    this.apiCallService.getMyTrainingData('adult', 'basic').subscribe((data:any) =>{
      this.loadingContollerService.loadingDismiss();
     
      this.liveClassesData = data.data.image;
      this.videoListData = data.data.video[1].share_code.gplus;
      console.log('this.videoListData',this.videoListData);
      const _video = this.videoplayer.nativeElement;
      _video.src = this.videoListData;
    })
  }
  async openSlideShow() {
    const modal = await this.modalController.create({
      component: GettingStartedTrainingPage,
    });
    return await modal.present();
  }
  playVideo(event: any) {
    let myVideo: any = document.getElementById("video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }
  async openSubcriptionModal(){
    const modal = await this.modalController.create({
      component: SubcriptionModalPage,
      cssClass: 'subscription-modal-component'
    });
    return await modal.present();
  }
}
