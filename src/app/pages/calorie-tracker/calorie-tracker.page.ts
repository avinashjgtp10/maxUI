import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.page.html',
  styleUrls: ['./calorie-tracker.page.scss'],
})
export class CalorieTrackerPage implements OnInit {
  currentSegment: any = 'Breakfast';
  segmentData: any = [ {
    segmentName:'Breakfast',
    segmentValue:'breakfast'
  },
  {
    segmentName:'Morning Snack',
    segmentValue:'morning-snack'
  },
  {
    segmentName:'Lunch',
    segmentValue:'lunch'
  },
  {
    segmentName:'Evening Snack',
    segmentValue:'evening-snack'
  },
  {
    segmentName:'Dinner',
    segmentValue:'dinner'
  }]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  segmentChanged(e){
   console.log(e);
  this.currentSegment = e.detail.value;
  }

}
