import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { GettingStartedTrainingPage } from '../getting-started-training/getting-started-training.page';
import { SubcriptionModalPage } from '../subcription-modal/subcription-modal.page';
import * as dacast from './../../../assets/lib/player';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
declare var dacast: any;
import { Media, MediaObject } from '@ionic-native/media/ngx';
@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.page.html',
  styleUrls: ['./my-training.page.scss'],
})
export class MyTrainingPage implements OnInit {
  liveClassesData: Array<Object> = [];
  videoListData: any;
  file: MediaObject;
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
    private loadingContollerService: LoadingContollerService,
    private media: Media,
    private streamingMedia: StreamingMedia) { }

  ngOnInit() {
    this.getData();
    // this.file = this.media.create('https://dacasts3-vh.akamaihd.net/i/secure/181403/181403_,938070.mp4,.csmil/master.m3u8');
  }
  getData(){
    this.loadingContollerService.loadingPresent();
    this.apiCallService.getMyTrainingData('adult', 'basic').subscribe((data:any) =>{
      this.loadingContollerService.loadingDismiss();
     
      this.liveClassesData = data.data.image;
      this.videoListData = `https:`+data.data.video[1].hls;
      // console.log('this.videoListData',this.videoListData);
      // const _video = this.videoplayer.nativeElement;
      // _video.src = this.videoListData;
    })
  }
  async openSlideShow() {
    const modal = await this.modalController.create({
      component: GettingStartedTrainingPage,
    });
    return await modal.present();
  }
  playVideo() {
    // let myVideo: any = document.getElementById("video_1");
    // if (myVideo.paused) myVideo.play();
    // else myVideo.pause();
    // let CONTENT_ID = "1552_f_297509";
    // let myPlayer = dacast(CONTENT_ID, 'myDiv', { 
    //     width: 350, 
    //     height: 200 
//     //   });
//     this.file.play();
//     this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when this.file status changes

// this.file.onSuccess.subscribe(() => console.log('Action is successful'));

// this.file.onError.subscribe(error => console.log('Error!', error));

let options: StreamingVideoOptions = {
  successCallback: () => { console.log('Video played') },
  errorCallback: (e) => { console.log('Error streaming') },
  orientation: 'landscape',
  shouldAutoClose: true,
  controls: true
};
this.streamingMedia.playVideo(this.videoListData, options);
  }
  async openSubcriptionModal(){
    const modal = await this.modalController.create({
      component: SubcriptionModalPage,
      cssClass: 'subscription-modal-component'
    });
    return await modal.present();
  }
}
