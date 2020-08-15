import { Component, OnInit, ViewChild } from '@angular/core';
import { DateProviderService } from 'src/app/services/date/date-provider.service';
import { IonSlides, NavParams, ModalController } from '@ionic/angular';




@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.page.html',
  styleUrls: ['./date-slider.page.scss'],
})
export class DateSliderPage implements OnInit {
  @ViewChild('dateModalSlider', { static: false }) dateModalSlider: IonSlides;
  dateSliderData: any = [];
  slideOpts = {
    initialSlide: 5,
     slidesPerView: 7,
    speed: 400
  };
  activeSlide: any;
  fromDate: any;
  toDate: any;
  selectedDate: any;
  selectedDateIndex: number = 0;

  public didInit: boolean = false;

 
  constructor(private dateService: DateProviderService, 
              private navParams: NavParams,
              private modalController: ModalController) {
    console.log(this.navParams.get("fromDate"));
    this.fromDate = this.navParams.get("fromDate");
    this.toDate = this.navParams.get("toDate");
    this.selectedDate = this.navParams.get("selectedDate");
   }

  ngOnInit() {
    this.dateService.getAllDates(this.fromDate, this.toDate, this.selectedDate).then((data)=> {
      this.dateSliderData = data['dates'];
      this.selectedDateIndex = data['selectedIndex'];
    });
    setTimeout(() => {
      this.didInit = true;
    }, 20);
    setTimeout(() => {
       this.dateModalSlider.slideTo(this.selectedDateIndex - 1, 0);
    }, 100);
  }
  
  dateSelected(date){
       this.modalController.dismiss(date);
  }

}
