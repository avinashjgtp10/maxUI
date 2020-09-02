import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DaySchedulePage } from '../day-schedule/day-schedule.page';

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.page.html',
  styleUrls: ['./training-overview.page.scss'],
})
export class TrainingOverviewPage implements OnInit {
  public items: any = [];
  selectedSegment: any = 'Overview';
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.items = [
      { 
        week:1,
        weekRange: '14 Jul-20 Jul',
        progress: 0.25,
        title: 'Circuit Training',
        isChecked: true,
        isSelected: false
      },
      { 
        week:2,
        weekRange: '21 Jul-27 Jul',
        progress: 0.50,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        week:3,
        weekRange: '28 Jul-5 Aug',
        progress: 0.75,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        week:4,
        weekRange: '6 Aug-14 Aug',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
    ];
  }
  segmentChanged(e) {
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
