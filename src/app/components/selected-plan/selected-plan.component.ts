import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiCallService } from 'src/app/services/api/api-call.service';
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss'],
})
export class SelectedPlanComponent implements OnInit {
  @Input() selectedPlan: any;
  price: any;
  relationship: any;
  constructor(public modalController: ModalController, public apiService: ApiCallService) { }

  ngOnInit() {
    this.price = this.selectedPlan['mode'] === 'standard' ? this.selectedPlan.y_price : this.selectedPlan.sp_price;
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onSelctedPlan($event) {
    this.price = $event.detail.value;
  }
  onPayment() {
    let data = {
      amount: 100
    }
    this.apiService.getPaymentId(data).subscribe((res) => {
      this.paymentGateway(res);
    }, err => {
      console.log("Error");
    })
  }
  paymentGateway(res) {
    let options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      order_id: res.id,
      currency: 'INR',
      key: 'rzp_live_aPJ6aNbQ0xMBdx	',
      amount: '100',
      name: 'Acme Corp',
      theme: {
        color: '#3399cc'
      }
    }
    let successCallback = function (success) {
      alert('payment_id: ' + success.razorpay_payment_id)
      var orderId = success.razorpay_order_id
      var signature = success.razorpay_signature
    }
    let cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')')
    }
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)
  }

}
