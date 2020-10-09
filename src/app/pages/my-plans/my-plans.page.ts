import { Component, OnInit } from "@angular/core";
declare var RazorpayCheckout: any;
@Component({
  selector: "app-my-plans",
  templateUrl: "./my-plans.page.html",
  styleUrls: ["./my-plans.page.scss"],
})
export class MyPlansPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  payWithRazorpay() {
    var options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      order_id: "order_DBJOWzybf0sJbb",
      currency: "INR",
      key: "rzp_live_aPJ6aNbQ0xMBdx",
      amount: "5000",
      name: "Acme Corp",
      theme: {
        color: "#3399cc",
      },
    };
    var successCallback = function (success) {
      alert("payment_id: " + success.razorpay_payment_id);
      var orderId = success.razorpay_order_id;
      var signature = success.razorpay_signature;
    };
    var cancelCallback = function (error) {
      alert(error.description + " (Error " + error.code + ")");
    };
    RazorpayCheckout.on("payment.success", successCallback);
    RazorpayCheckout.on("payment.cancel", cancelCallback);
    RazorpayCheckout.open(options);
  }
}
