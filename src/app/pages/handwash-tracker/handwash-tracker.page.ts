import { Component, OnInit } from '@angular/core';
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Howl } from 'howler';

@Component({
  selector: 'app-handwash-tracker',
  templateUrl: './handwash-tracker.page.html',
  styleUrls: ['./handwash-tracker.page.scss'],
})
export class HandwashTrackerPage implements OnInit {
  htAchived:number = 0;
  htGoal: number = 16;
  mm = 0;
  ss = 0;
  ms = 0;
  isRunning = false;
  timerId: any = 0;
  player: Howl = null;
  isPlaying: boolean = false;

  constructor(public toastController: ToastController,
    public loadingService: LoadingContollerService,
    public modalController: ModalController,
    public apiService: ApiCallService) { }

  ngOnInit() {
    this.getHandwasTrackerData();
    this.player = new Howl({
      src: ['./assets/mp3/hand_wash_sound.mp3'],
      html5: true,
      onplay: ()=> {
       this.isPlaying = true;
      },
      onend: ()=>{
        this.isPlaying = false;
        clearInterval(this.timerId);
        this.mm = 0;
        this.ms = 0;
        this.ss = 0;
        this.timerId = 0;
      }
    });
  }
  // startSong(){
  //   if(this.player){
  //     this.player.stop();
  //   }
   
  //   this.player.play();
  // }
  getHandwasTrackerData(){
    this.loadingService.loadingPresent();
    let date = moment().format('DD/MM/YYYY');
    let data = {
      to_date: date,
      from_date: date,
      ht_cid: localStorage.getItem('c_id')
    }
    this.apiService.searchHandwashTrackerData(data).subscribe((response: any) => {
      console.log("response",response);
      if(response.date && response.date.length) {
          this.htAchived = parseInt(response.date[0].ht_achived);
          this.htGoal = parseInt(response.date[0].ht_goal);
      }
      this.loadingService.loadingDismiss();
    }, (error) => {
      this.loadingService.loadingDismiss();
      console.log("error",error);
    });
  }
  doSomethingWithCurrentValue(e){
    //console.log(e);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have reached todays goal of Handwash',
      duration: 3000
    });
    toast.present();
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  addHandWashEntry(){
    if(this.htAchived >= this.htGoal){
        this.presentToast();
    } else {
      let date = moment().format('DD/MM/YYYY');
      this.loadingService.loadingPresent();
      let data = {
        ht_date: date,
        ht_goal: this.htGoal,
        ht_achived: this.htAchived + 1,
        ht_cid: localStorage.getItem('c_id')
      }
      this.apiService.storeHandwashTrackerData(data).subscribe((responce:any)=>{
        this.htAchived = this.htAchived + 1;
        this.loadingService.loadingDismiss();
      }, (error)=>{
        console.log(error);
        this.loadingService.loadingDismiss();
      })
    }
  }
  clickHandler() {
    if (!this.isRunning && !this.isPlaying) {
      // Stop => Running
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms >= 100) {
          this.ss++;
          this.ms = 0;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0
        }
      }, 10);
      this.player.play();
    } else {
      clearInterval(this.timerId);
      if(this.isPlaying){
        this.player.pause();
        this.isPlaying = !this.isPlaying;
      }
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
}
