import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss'],
})
export class SelectedPlanComponent implements OnInit {
  @Input() selectedPlan: any;
  price: any;
  relationship: any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.price = this.selectedPlan['mode'] === 'standard' ? this.selectedPlan.y_price : this.selectedPlan.sp_price;
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onSelctedPlan($event) {
    this.price = $event.detail.value;
  }

}
