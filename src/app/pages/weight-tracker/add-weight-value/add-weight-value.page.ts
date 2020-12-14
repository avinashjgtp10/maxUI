import { Component, OnInit } from '@angular/core';
import {  NavParams, ModalController } from '@ionic/angular';
import { ToastProvider } from 'src/app/services/toast/toast';

@Component({
  selector: 'app-add-weight-value',
  templateUrl: './add-weight-value.page.html',
  styleUrls: ['./add-weight-value.page.scss'],
})
export class AddWeightValuePage implements OnInit {

  currentValue: number = 60;

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private toastProvider: ToastProvider) {
      this.currentValue = +this.navParams.get("currentWeight");
     }

  ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss(this.currentValue);
  }

  updateWeight(value){
    this.currentValue += value;
    if(this.currentValue < 1){
      this.toastProvider.presentToast('Weight value cannot be be 0!');
      this.currentValue = 1;
    }
     console.log(value);
   }

}
