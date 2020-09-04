import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-getting-started-training',
  templateUrl: './getting-started-training.page.html',
  styleUrls: ['./getting-started-training.page.scss'],
})
export class GettingStartedTrainingPage implements OnInit {
  Opts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
