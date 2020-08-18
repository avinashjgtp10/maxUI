import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as CanvasJS from './../../../assets/lib/canvasjs.min';
import { DateSliderPage } from '../date-slider/date-slider.page';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { DateProviderService } from 'src/app/services/date/date-provider.service';
import { ToastProvider } from 'src/app/services/toast/toast';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-weight-tracker',
  templateUrl: './weight-tracker.page.html',
  styleUrls: ['./weight-tracker.page.scss'],
})
export class WeightTrackerPage implements OnInit {

  //@ViewChild('graphSlider', { static: false }) graphSlider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };
  graphViewableDateText = "Last 7 days"
  currentData = {
    wt_goal: 8,
    wt_achived: 0,
    wt_date: ""
  }
  addDataSubscribe;
  oneMonthData;
  fromDate: string;
  graphDatatoPlot = [

  ];
  chart = [];

  isDateSliderOpened: boolean = false;

  selectedActiveDateFormat: string = "Today";


  constructor(private modalController: ModalController,
    private apiService: ApiCallService,
    private dateProviderService: DateProviderService,
    private toastProvider: ToastProvider,
    private loadingContollerService: LoadingContollerService) { }

  ngOnInit() {

  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  openDateSlide() {
    if (!this.isDateSliderOpened) {
      this.openDateSliderModal();
    }
  }
  async openDateSliderModal() {
    this.isDateSliderOpened = true;
    const modal = await this.modalController.create({
      component: DateSliderPage,
      cssClass: 'date-slider-component',
      componentProps: {
        fromDate: this.fromDate,
        toDate: undefined,
        selectedDate: this.currentData.wt_date
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isDateSliderOpened = false;
        console.log(data);
        if (data.data) {
          this.currentData.wt_date = data.data.dateFormatted;
          //this.getDataByDate(data.data.dateFormatted);
          if (!(data.data.isToday)) {
            this.selectedActiveDateFormat = (data.data.pageText);
          } else {
            this.selectedActiveDateFormat = "Today";
          }
        }
      });
    return await modal.present();
  }

}
