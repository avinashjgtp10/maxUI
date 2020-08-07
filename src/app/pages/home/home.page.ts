import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { CalorieTrackerPage } from '../calorie-tracker/calorie-tracker.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public items: any = [];
  isExpanded: boolean = false;
  trackersData: any = [];
  constructor(public actionSheetController: ActionSheetController,
    private storage:Storage, public modalController: ModalController) {
   }
  ngOnInit() {
    this.trackersData = [{
      name: 'Calorie Tracker',
      data: '300 of 2250 Cal Eaten',
     },
     {
      name: 'Water Tracker',
      data: '0 of 9 Glasses consumed',
     },
     {
      name: 'Weight Tracker',
      data: '76.07 kg',
     },
     {
      name: 'Handwash Tracker',
      data: '6 of 12 washes done',
     }];
  }
  async actionSheet(data:object){
    console.log('data',data);
    const actionSheet = await this.actionSheetController.create({
      header: 'What meal would you like to track?',
      cssClass: 'my-custom-class',
      mode: 'md',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }]
    });
    await actionSheet.present();
  }

 async calorieTracker() {
    const modal = await this.modalController.create({
      component: CalorieTrackerPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
