import { Component, OnInit,ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { CalorieTrackerPage } from '../calorie-tracker/calorie-tracker.page';
import { IonSlides } from '@ionic/angular';
import { Router,ActivatedRoute } from "@angular/router"
import { WaterTrackerPage } from '../water-tracker/water-tracker.page';
import { HandwashTrackerPage } from '../handwash-tracker/handwash-tracker.page';
import { WeightTrackerPage } from '../weight-tracker/weight-tracker.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public items: any = [];
  isExpanded: boolean = false;
  trackersData: any = [];
  liveClassesData: Array<Object> = [];
  specialPlanesData: Array<Object> = [];
  @ViewChild('liveClassesSlider', { static: false }) liveClassesSlider: IonSlides;
  @ViewChild('offersSlider', { static: false }) offersSlider: IonSlides;
  @ViewChild('specialPlansSlider', { static: false }) specialPlansSlider: IonSlides;
  constructor(public actionSheetController: ActionSheetController,private route:Router,
    private storage:Storage, public modalController: ModalController) {
   }
   liveClassesOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    speed: 400
    };
    offersOpts = {
      initialSlide: 0,
      slidesPerView: 2.5,
      speed: 400
    };
    specialPlansOpts = {
      initialSlide: 0,
      slidesPerView: 2.5,
      speed: 400
   };
  ngOnInit() {
    this.liveClassesData = [{
      name: 'Live1',
      imgUrl: ''
    },{
      name: 'Live2',
      imgUrl: ''
    },{
      name: 'Live3',
      imgUrl: ''
    },
    {
      name: 'Live4',
      imgUrl: ''
    }]
    this.specialPlanesData = [{
      title: 'Muscle Training',
      imgUrl: '',
      desc:'Lorem Ipsum is simply dummy text'
    },{
      title: 'Yoga',
      imgUrl: '',
      desc:'Lorem Ipsum is simply dummy text'
    },{
      title: 'Weight Loss',
      imgUrl: '',
      desc:'Lorem Ipsum is simply dummy text'
    }]
  }
 
  openTrackerDetail(event){
   // console.log(event);
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

  async weightTracker() {
    const modal = await this.modalController.create({
      component: WeightTrackerPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
 
}
