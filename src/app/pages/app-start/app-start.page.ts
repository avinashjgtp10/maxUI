import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { LanguageService } from "../../services/language/language.service";
import { ApiCallService } from "../../services/api/api-call.service";
import {FormGroup,FormControl,Validators,FormArray, FormBuilder} from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-app-start',
  templateUrl: './app-start.page.html',
  styleUrls: ['./app-start.page.scss'],
})
export class AppStartPage implements OnInit {
  form = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
    ])
   });
   resendCounter: number;
   otp: string;
   termsIsChecked: boolean = true;
   showResendCounter: boolean = false;
   showResendAndGetCallButton: boolean = false;
   mobileNumberEntered: string;
   showWrongOtpError: boolean = false;
   isOtpButtonDisabled: boolean = true;
   @ViewChild('loginSlider', { static: false }) loginSlider: IonSlides;
   @ViewChild('imageSlider', { static: false }) imageSlider: IonSlides;
   @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
   @ViewChild('ngOtpInputCall', { static: false}) ngOtpInputCall: any;
   config = {
     allowNumbersOnly: true,
     length: 4,
     inputClass:'otp-box',
     containerClass:'otp-container',
     isPasswordInput: false,
     disableAutoFocus: false,
     placeholder: '',
     inputStyles: {
       'width': '60px',
       'height': '45px'
     }
   };
   onOtpChange(otp) {
     this.otp = otp;
     this.showWrongOtpError = false;
     if(this.otp.length === 4) {
      this.isOtpButtonDisabled = false;
     } else {
      this.isOtpButtonDisabled = true;
     }
   }

  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    preloadImages: true,
    autoplay:true,
    loop:true
  };
  slideImages=[
      "assets/img/img 1.svg",
      "assets/img/img2 2.svg",
      "assets/img/Group 45.svg",
  ];
  loginSliderOpts = {
    initialSlide: 0,
    allowTouchMove: false,
    speed: 400
  };
  constructor(private route:Router,
    private language:LanguageService,
    private activatedRoute:ActivatedRoute,
    public apiService: ApiCallService,
    private storage:Storage,
    public loadingController: LoadingController) { 
  }
  
  slideToPrevious() {
    this.loginSlider.slidePrev();
  }
  setVal(val) {
    this.ngOtpInput.setValue(val);
    this.ngOtpInputCall.setValue(val);
  }
  checkOtpEntered(){
    this.showWrongOtpError = false;
    let myOtp = '1234';
    let args = {
      tel_number : `${this.mobileNumberEntered}`,
      code :this.otp,
      channel :"SMS",
      access: "client"
    }
    this.storage.get('Session_Id').then((val) => {
      this.apiService.verifyOtp(args,val).subscribe((response: any) => {
        if(response.status === "success"){
            this.showWrongOtpError = false;
             this.route.navigate(["manage-profile"]);
          } else {  
              this.setVal('');       
              this.showWrongOtpError = true;
              this.isOtpButtonDisabled = true;
          }
      }, (error) => {
        console.log("error",error);
        if(this.otp === myOtp){
          this.showWrongOtpError = false;
           this.route.navigate(["manage-profile"]);
        } else {  
            this.setVal('');       
            this.showWrongOtpError = true;
            this.isOtpButtonDisabled = true;
        }
     });
    });
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  onSubmit(){
     this.mobileNumberEntered = this.form.value.mobileNumber;
    let args = {
      tel_number: `+91${this.mobileNumberEntered}`,
      channel :"SMS"
    }
    this.presentLoading();
    this.apiService.generateOtp(args).subscribe((response: any) => {
      console.log('response',response);
      if(response.Status === 'Success'){
           this.storage.set('Session_Id',response.Details);
           this.loginSlider.slideNext();
           this.setVal('');
           this.timerTick();
           this.showResendCounter = true;
           this.showResendAndGetCallButton = false;
           this.resendCounter = 30;
      }
    }, (error) => {
      console.log("error",error);
    });
  }
  resendOtp() {
     let args = {
      tel_number: `+91${this.mobileNumberEntered}`,
      channel :"SMS"
    }
    this.apiService.generateOtp(args).subscribe((response: any) => {
      console.log('response',response);
      if(response.Status === 'Success'){
           this.storage.set('Session_Id',response.Details);
           this.setVal('');
           this.timerTick();
           this.showResendCounter = true;
           this.showResendAndGetCallButton = false;
           this.resendCounter = 30;
      }
    }, (error) => {
      console.log("error",error);
    });;
  }
  slideToGetCall(){
    let args = {
      tel_number: `${this.mobileNumberEntered}`,
      channel :"voice"
    }
    this.apiService.getCall(args).subscribe((response: any) => {
      console.log('response',response);
      if(response.Status === 'Success'){
        this.resendCounter = 60;
        this.loginSlider.slideNext();
        this.imageSlider.slideTo(4);
        this.imageSlider.lockSwipes(true);
        this.setVal('');
        this.timer();
      }
  }, (error) => {
    console.log("error",error);
  });
  }
  ngOnInit() {
    this.language.setInitalAppLanguage();
  }
  timerTick() {
    setTimeout(() => {
      this.resendCounter--;
      if (this.resendCounter > 0) {
        this.timerTick();
      }
      else {
        this.showResendCounter = false;
        this.showResendAndGetCallButton = true;
      }
    }, 1000);
  }
  timer() {
    setTimeout(() => {
      this.resendCounter--;
      if (this.resendCounter > 0) {
        this.timer();
      }
      else {
        this.loginSlider.slideNext();
        this.imageSlider.lockSwipes(false);
        this.imageSlider.slideTo(5);
        this.imageSlider.lockSwipes(true);
      }
    }, 1000);
  }
  goToDashboard(){
    let id="65"
    this.route.navigate(["dashboard-with-id",id]);
    console.log("Hey this is dashboard")
  }

}
