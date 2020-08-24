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
  unitValue: number = 250;
  showWaterUnit: boolean = false;
  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private toastProvider: ToastProvider) {
      this.currentGoal = this.navParams.get("currentGoal");
      this.unitValue = this.navParams.get("currentUnit");
     }

  ngOnInit() {
  }
  closeModal(){
    if(this.showWaterUnit){
      this.showWaterUnit = false;
      
    }else{
      const data = {
        unitValue: this.unitValue,
        goal: this.currentGoal
      }
      this.modalController.dismiss(data);
    }
   
  }
  updateGoal(value){
   this.currentGoal = this.currentGoal + value;
   if(this.currentGoal < 1){
     this.toastProvider.presentToast('Goal should be at least 1L');
     this.currentGoal = 1;
   }
 
  }

  editWaterUnit(){
    this.showWaterUnit = true;
  }

}
