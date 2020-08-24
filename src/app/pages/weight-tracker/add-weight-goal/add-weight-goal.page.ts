import { Component, OnInit } from '@angular/core';
import {  NavParams, ModalController } from '@ionic/angular';
import { ToastProvider } from 'src/app/services/toast/toast';

@Component({
  selector: 'app-add-weight-goal',
  templateUrl: './add-weight-goal.page.html',
  styleUrls: ['./add-weight-goal.page.scss'],
})
export class AddWeightGoalPage implements OnInit {

  currentWeight: number;
   goalWeights: number = 0;
   activityLevel: string = 'high';


  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private toastProvider: ToastProvider) {
      this.currentWeight = this.navParams.get("currentWeight");
      this.goalWeights = this.navParams.get("goalWeight");
      this.activityLevel = this.navParams.get("currentActivityLevel");
      console.log(this.goalWeights);
      if(!this.goalWeights || this.goalWeights < 1){
        this.goalWeights = this.currentWeight;
        console.log(this.goalWeights);
      }
      console.log(this.goalWeights);
     }

  ngOnInit() {
  }
  closeModal(){
    if(this.goalWeights === this.currentWeight){
      this.toastProvider.presentToast('Your current weight and goal cannot be same!');
      return;
    }
    const data = {
      goalWeights:  this.goalWeights,
      activityLevel: this.activityLevel,
      startingValue: this.currentWeight
    }
    this.modalController.dismiss(data);
  }

  updateGoal(value){
    this.goalWeights = this.goalWeights + value;
    if(this.goalWeights < 1){
      this.toastProvider.presentToast('Weight value cannot be be 0');
      this.goalWeights = 1;
    }
     console.log(value);
   }

}
