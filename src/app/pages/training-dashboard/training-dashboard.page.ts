import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.page.html',
  styleUrls: ['./training-dashboard.page.scss'],
})
export class TrainingDashboardPage implements OnInit {
  @ViewChild('offersSlider', { static: false }) offersSlider: IonSlides;
  public items: any = [];
  liveClassesData: Array<Object> = [];
  specialPlanesData: Array<Object> = [];
  offersOpts = {
    initialSlide: 0,
    slidesPerView: 3.5,
    speed: 400
  };
  constructor() {
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
   }

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
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
