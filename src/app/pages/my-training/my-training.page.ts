import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.page.html',
  styleUrls: ['./my-training.page.scss'],
})
export class MyTrainingPage implements OnInit {
  liveClassesData: Array<Object> = [];
  specialPlanesData: Array<Object> = [];
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
  constructor() { }

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

}
