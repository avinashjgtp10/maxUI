import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DateProviderService } from "../../services/date/date-provider.service";
import { IonSlides } from '@ionic/angular';
import { ApiCallService } from "../../services/api/api-call.service";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";

@Component({
  selector: 'app-add-calorie',
  templateUrl: './add-calorie.page.html',
  styleUrls: ['./add-calorie.page.scss'],
})
export class AddCaloriePage implements OnInit {
  @ViewChild('dateSlider', { static: false }) dateSlider: IonSlides;
  @Input() selectedSegment: string;
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
  constructor(public toastController: ToastController,  
    public dateService: DateProviderService,
    public modalController: ModalController,
    public loadingService: LoadingContollerService,
    public apiService: ApiCallService) {  
    }
  ionViewWillEnter() {
    console.log('Selected Segment', this.selectedSegment);
    this.getAllFoodData();
  }
  ngOnInit() { 
  }
  getAllFoodData(){
    this.loadingService.loadingPresent();
    this.apiService.getAvailableFoodData().subscribe((response: any) => {
      console.log('response',response);
      this.frequentlyFoodData = response;
      this.dateService.getTwoWeekDates().then((dates)=>{
        this.dateSliderData = dates;
        this.activeSlide = this.dateSliderData.filter((v,i,a) => {
          if(v.isToday) {
            return v;
          }
        });
        this.dateSlider.slideTo(this.activeSlide[0].index, 400).then(()=> {
          this.loadingService.loadingDismiss();
        });
      });
    }, (error) => {
      this.loadingService.loadingDismiss();
      console.log("error",error);
    });
  }
  closeModal(refresh = false) {
    this.modalController.dismiss({
      isRefresh: refresh
    });
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
      this.activeSlide = this.dateSliderData.filter((v,i,a) => {
        if(v.isSelected) {
          return v;
        }
      })
      console.log('activeSlide',this.activeSlide);
      // API Call
    });
  }

  foodSelected(food,i) {
    let result = this.selectedFoodData.filter(e => (e.c_id === food.c_id));
    console.log('result',result);
    if (result.length > 0) {
      let index = this.selectedFoodData.findIndex(item => (item.c_id === result[0].c_id));
      this.selectedFoodData.splice(index,1);
      this.frequentlyFoodData[i].isAdded = false;
    } else {
      this.frequentlyFoodData[i].isAdded = true;
      this.selectedFoodData.push(food);
    }

    if(this.selectedFoodData.length) {
      this.presentToastWithOptions(this.selectedFoodData);
      console.log('this.selectedFoodData',this.selectedFoodData);
     } else {
       this.toast.dismiss();
     }
  }
  searchFood(event) {
  const searchTerm = (event.srcElement.value).trim();;
  console.log('searchTerm',searchTerm);

     if(searchTerm === ''){
       this.getAllFoodData();
       return;
     }

    if (searchTerm.length < 2) {
      return;
    }
    this.loadingService.loadingPresent();
     this.apiService.searchUserFoodData(searchTerm).subscribe((data)=>{
       console.log('data',data);
       this.frequentlyFoodData = data;
       this.loadingService.loadingDismiss();
     }, (error)=> {
      this.loadingService.loadingDismiss();
     });
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
      mode:'md',
      cssClass: 'add-calorie-toast',
      keyboardClose: true,
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'UNDO',
          handler: () => {
            this.selectedFoodData = [];
            this.frequentlyFoodData.forEach((item) => {
                 if(item.isAdded){
                   item.isAdded = false;
                 }
            });
            console.log('Undo clicked',this.frequentlyFoodData);
          }
        }, {
          side: 'end',
          text: 'DONE',
          handler: () => {
            console.log('Done clicked Api Call');
            this.loadingService.loadingPresent();
            let args = {
              caloriesConsumption: this.selectedFoodData
            }
            this.selectedFoodData.forEach((item)=>{
                item.date = this.activeSlide[0].dateFormatted,
                item.consumed_category = this.selectedSegment
            })
            this.apiService.storeFoodData(args,localStorage.getItem('c_id')).subscribe((response: any) => {
              console.log('response',response);
              this.loadingService.loadingDismiss();
              this.dismissToast();
              this.closeModal(true);
            }, (error) => {
              this.loadingService.loadingDismiss();
              console.log("error",error);
            });
          }
        }
      ]
    });
    this.toast.present();
  }

}
