import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ApiCallService } from "src/app/services/api/api-call.service";
import { Storage } from "@ionic/storage";
import { ToastProvider } from "../../services/toast/toast";
import { Router } from "@angular/router"

declare var RazorpayCheckout: any;

@Component({
  selector: "app-selected-plan",
  templateUrl: "./selected-plan.component.html",
  styleUrls: ["./selected-plan.component.scss"],
})
export class SelectedPlanComponent implements OnInit {
  @Input() selectedPlan: any;
  price: any;
  relationship: any;
  constructor(
    private router: Router,
    public modalController: ModalController,
    private storage: Storage,
    public apiService: ApiCallService,
    public toast: ToastProvider
  ) {}

  ngOnInit() {
    this.price =
      this.selectedPlan["sp_mode"] === "standard"
        ? this.selectedPlan.y_price
        : this.selectedPlan.sp_price;
        console.log(this.selectedPlan)
  }
  closeModal() {
    this.modalController.dismiss();
  }
  onSelctedPlan($event) {
    this.price = $event.detail.value;
  }
  onPayment() {
    let data = {
      amount: 100,
    };

    this.apiService.getPaymentId(data).subscribe(
      (res) => {
        this.paymentGateway(res);
      },
      (err) => {
        console.log("Error");
      }
    );
  }
  paymentGateway(res) {
    let options = {
      description: "Buy plan",
      image: "../../../assets/icon/logo.svg",
      order_id: res.id,
      currency: "INR",
      key: "rzp_test_nbSua2NTmlPCR7",
      amount: "100",
      name: "MAX-Fit",
      theme: {
        color: "#e02828",
      },
    };
    let successCallback = (success: any) =>{
      var orderId = success.razorpay_order_id;
      var signature = success.razorpay_signature;
      let payload = {
        plan: "premium",
      };

      this.storage.get("User_Data").then((data: any) => {
        this.apiService
          .updateUserPlan(payload, data.c_id)
          .subscribe((res: any) => {
            this.toast.presentToast("Thanks for the subscribing to our plan.");
            localStorage.setItem("plan", "premium");
            this.modalController.dismiss();
          });
      });
    };

    let cancelCallback =  (error:any)=> {
      this.toast.presentToast("Payment cancelled");
    };
    RazorpayCheckout.on("payment.success",successCallback);
    RazorpayCheckout.on("payment.cancel", cancelCallback);
    RazorpayCheckout.open(options);
  }
}
