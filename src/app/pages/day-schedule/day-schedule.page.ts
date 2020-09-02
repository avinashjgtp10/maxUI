import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WorkOutVideoPage } from '../work-out-video/work-out-video.page';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.page.html',
  styleUrls: ['./day-schedule.page.scss'],
})
export class DaySchedulePage implements OnInit {
  public items: any = [];
  @Input() scheduleData: any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.items = [
      { 
        day:1,
        weekRange: '14 July 2020',
        progress: 0.25,
        title: 'Circuit Training',
        isChecked: true,
        isSelected: false
      },
      { 
        dat:2,
        weekRange: '21 July 2020',
        progress: 0.50,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:3,
        weekRange: '28 July 2020',
        progress: 0.75,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:4,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:5,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:6,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:7,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
    ];
  }
  async openVideo(item) {
    const modal = await this.modalController.create({
      component: WorkOutVideoPage,
      componentProps: {
        'playlistData': item
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
