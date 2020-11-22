import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
} from "@angular/core";
import { ModalController, IonSlides, NavController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { TrainingDashboardPage } from "../training-dashboard/training-dashboard.page";

@Component({
  selector: "app-getting-started-training",
  templateUrl: "./getting-started-training.page.html",
  styleUrls: ["./getting-started-training.page.scss"],
})
export class GettingStartedTrainingPage implements OnInit {
  trainingSliderOpts = {
    speed: 400,
    initialSlide: 0,
    preloadImages: true,
    allowTouchMove: false,
  };
  result: any;
  @ViewChild("trainingSlider", { read: ElementRef }) slider: ElementRef;
  slideIndex: number = 1;
  totalSlides: number = 5;
  slideProgress: number = 0;
  dataObj = {
    objective: "",
    fitnesslevel: "",
    weeks: "",
    oftenweek: "",
    cid: localStorage.getItem("c_id"),
    plan: "standard",
  };
  constructor(
    private route: Router,
    private navCtrl: NavController,
    public modalController: ModalController,
    private apiCallService: ApiCallService,
    private loadingContollerService: LoadingContollerService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.slider.nativeElement.update();
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    this.slideProgress = this.slideIndex / this.totalSlides;
  }
  setData(key, value) {
    this.dataObj[key] = value;
    if (this.slideIndex === this.totalSlides - 1) {
      this.storeAllInfo();
    } else {
      this.slideToNext();
    }
  }
  storeAllInfo() {
    this.loadingContollerService.loadingPresent();
    this.apiCallService
      .gettingStartedData(this.dataObj)
      .subscribe((result: any) => {
        this.loadingContollerService.loadingDismiss();
        console.log("result", result);
        this.result = result;
        this.slideToNext();
      });
  }
  slideToNext() {
    this.slider.nativeElement.slideNext(400);
    this.slideIndex = this.slideIndex + 1;
    this.slideProgress = this.slideIndex / this.totalSlides;
  }
  slideToPrev() {
    this.slider.nativeElement.slidePrev(400);
    this.slideIndex = this.slideIndex - 1;
    this.slideProgress = this.slideIndex / this.totalSlides;
  }
  closeModal() {
    if (this.slideIndex === 1 || this.slideIndex === 5) {
      this.navCtrl.back();
    } else {
     this.slideToPrev()
    }
  }
  async goToTrainigDasboard() {
    // const modal = await this.modalController.create({
    //   component: TrainingDashboardPage,
    //   cssClass: "my-custom-class",
    // });
    // return await modal.present();
    this.route.navigate(["training-dashboard",{data:""}])
  }
}
