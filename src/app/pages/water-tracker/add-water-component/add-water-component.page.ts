import { Component, OnInit } from '@angular/core';
import {  NavParams, ModalController } from '@ionic/angular';
import { ToastProvider } from 'src/app/services/toast/toast';


@Component({
  selector: 'app-add-water-component',
  templateUrl: './add-water-component.page.html',
  styleUrls: ['./add-water-component.page.scss'],
})
export class AddWaterComponentPage implements OnInit {
  currentGoal: number;
  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private toastProvider: ToastProvider) {
      this.currentGoal = this.navParams.get("currentGoal");
     }

  ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss(this.currentGoal);
  }
  updateGoal(value){

   this.currentGoal = this.currentGoal + value;
   if(this.currentGoal < 1){
     this.toastProvider.presentToast('Goal should be at least 1L');
     this.currentGoal = 1;
   }
  
    console.log(value);
  }

}
