import { Component, OnInit } from '@angular/core';
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-handwash-tracker',
  templateUrl: './handwash-tracker.page.html',
  styleUrls: ['./handwash-tracker.page.scss'],
})
export class HandwashTrackerPage implements OnInit {
  htAchived:number = 0;
  htGoal: number = 16;
  constructor(public toastController: ToastController,
    public loadingService: LoadingContollerService,
    public modalController: ModalController,
    public apiService: ApiCallService) { }

  ngOnInit() {
    this.getHandwasTrackerData();
  }
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
}
