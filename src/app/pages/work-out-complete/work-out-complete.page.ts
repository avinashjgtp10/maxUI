import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';


@Component({
  selector: "app-work-out-complete",
  templateUrl: "./work-out-complete.page.html",
  styleUrls: ["./work-out-complete.page.scss"],
})
export class WorkOutCompletePage implements OnInit {
  constructor(public modalCntl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCntl.dismiss();
  }
}
