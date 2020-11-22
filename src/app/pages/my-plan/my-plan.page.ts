import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SelectedPlanComponent } from '../../components/selected-plan/selected-plan.component';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import * as _ from 'lodash';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.page.html',
  styleUrls: ['./my-plan.page.scss'],
})
export class MyPlanPage implements OnInit {
  planData: any;
  basicPlan = [];
  premiumPlan = [];
  standardPlan = [];
  specialPlan = [];
  testimonialsData = [];
  myPlan = "";
  planUrl = "";

  constructor(public modalController: ModalController,private storage: Storage,
       public api: ApiCallService, private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {
    this.loadingContollerService.loadingPresent();
    this.api.getAvailablePlan().subscribe((res) => {
      this.planData = res;
      this.checkplan(res['data']);
      this.loadingContollerService.loadingDismiss();
    }, err => {
      this.loadingContollerService.loadingDismiss();
      console.log("Unable to fetch plans");
    })
    this.getUserPlan()
  }

  ionViewDidEnter() {
  }

  getUserPlan(){
    this.myPlan = `${localStorage.getItem("plan")}`
    this.planUrl = this.myPlan == "basic" ?  "../../../assets/img/plan/basicPlan.jpg" : "../../../assets/img/plan/premiumPlan.jpg"
  }

  async OnPlan(selectedPlan: any) {
    const modal = await this.modalController.create({
      component: SelectedPlanComponent,
      cssClass: 'selected-plan-component',
      componentProps: {
        'selectedPlan': selectedPlan
      },
    });
    return await modal.present();
  }

  checkplan(data: any) {
    this.basicPlan = data.standard_plan ? _.filter(data.standard_plan, (ele) => ele.p_name == 'basic') : [];
    this.premiumPlan = data.standard_plan ? _.filter(data.standard_plan, (ele) => ele.p_name == 'premium') : [];
    this.standardPlan = data.standard_plan ? _.filter(data.standard_plan, (ele) => ele.p_name == 'standard') : [];
    this.specialPlan = data.special_plan;
    this.testimonialsData = data.testimonial;
  }
  closeModal() {
    this.modalController.dismiss();
  }

}
