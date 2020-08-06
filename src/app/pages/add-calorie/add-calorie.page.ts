import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DateProviderService } from "../../services/date/date-provider.service";
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-add-calorie',
  templateUrl: './add-calorie.page.html',
  styleUrls: ['./add-calorie.page.scss'],
})
export class AddCaloriePage implements OnInit {
  @ViewChild('dateSlider', { static: false }) dateSlider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 7,
    speed: 400
  };
  dateSliderData: any = [];
  frequentlyFoodData: any = [];
  activeSlide: any;
  selectedFoodData: any = [];
  toast: any;
  constructor(public toastController: ToastController,  public dateService: DateProviderService,) { }

  ngOnInit() {
    this.dateService.getTwoWeekDates().then((dates)=>{
      console.log('dates',dates);
      this.dateSliderData = dates;
      this.activeSlide = this.dateSliderData.filter((v,i,a) => {
        if(v.isToday) {
          return v;
        }
      })
      console.log('activeSlide',this.activeSlide);
      this.dateSlider.slideTo(this.activeSlide[0].index, 400).then(()=> {
    });
    });
    this.frequentlyFoodData = [
      {
        name:'Rava Upama',
        id:1,
        quantity: '1 Katori',
        isAdded: false,
        calories: '170 Cals',
      },
      {
        name:'Banana',
        id: 4,
        isAdded: false,
        quantity: '1.0 Small (6"-7/8" long)',
        calories: '340 Cals',
      },
      {
        name:'Orange',
        id: 6,
        isAdded: false,
        quantity: '1.0 large (3-1/4" dia)',
        calories: '62 Cals',
      },
      {
        name:'Green Tea',
        id: 2,
        isAdded: false,
        quantity: '1 Glass',
        calories: '89 Cals',
      }
    ];
  }

  slideChanged(e) {
    console.log('e',e);
  }
  slideToSelected(d,i) {
    this.dateSlider.slideTo(i,400).then(()=>{
      this.dateSliderData.forEach(element => {
         if(element.index === i) {
           element.isSelected = true
         } else {
          element.isSelected = false
         }
      });
      // API Call
    });
  }

  foodSelected(food,i) {
    let result = this.selectedFoodData.filter(e => (e.id === food.id || e.name === food.name));
    console.log('result',result);
    if (result.length > 0) {
      let index = this.selectedFoodData.findIndex(item => (item.id === result[0].id));
      console.log('index',index);
      this.selectedFoodData.splice(index,1);
      this.frequentlyFoodData[i].isAdded = false;
    } else {
      this.frequentlyFoodData[i].isAdded = true;
      this.selectedFoodData.push(food);
    }

    if(this.selectedFoodData.length) {
      this.presentToastWithOptions(this.selectedFoodData);
     } else {
       this.toast.dismiss();
     }
  }
  dismissToast() {
   this.toast.dismiss();
  }

  async presentToastWithOptions(data) {
    if (this.toast) {
      this.toast.dismiss();
    }
     this.toast = await this.toastController.create({
      message: `${data.length} items selected`,
      position: 'bottom',
      keyboardClose: true,
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'UNDO',
          handler: () => {
            console.log('Undo clicked');
            this.selectedFoodData = [];
            // this.dismissToast();
          }
        }, {
          side: 'end',
          text: 'DONE',
          handler: () => {
            console.log('Done clicked Api Call');
          }
        }
      ]
    });
    this.toast.present();
  }

}
