import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GettingStartedTrainingPage } from '../getting-started-training/getting-started-training.page';
@Component({
  selector: 'app-subcription-modal',
  templateUrl: './subcription-modal.page.html',
  styleUrls: ['./subcription-modal.page.scss'],
})
export class SubcriptionModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async openSlideShow() {
    const modal = await this.modalController.create({
      component: GettingStartedTrainingPage,
    });
    return await modal.present();
  }
}
