import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { CalorieTrackerPage } from '../calorie-tracker/calorie-tracker.page';

import { Router,ActivatedRoute } from "@angular/router"
import { WaterTrackerPage } from '../water-tracker/water-tracker.page';
import { HandwashTrackerPage } from '../handwash-tracker/handwash-tracker.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public items: any = [];
  isExpanded: boolean = false;
  trackersData: any = [];
  constructor(public actionSheetController: ActionSheetController,private route:Router,
    private storage:Storage, public modalController: ModalController) {
   }
  ngOnInit() {
  }
 
  openTrackerDetail(event){
    console.log(event);
    this[event.actionName]();
  }
  async waterTracker() {
    const modal = await this.modalController.create({
      component: WaterTrackerPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

 async calorieTracker() {
    const modal = await this.modalController.create({
      component: CalorieTrackerPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async handwashTracker() {
    const modal = await this.modalController.create({
      component: HandwashTrackerPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
 
}
