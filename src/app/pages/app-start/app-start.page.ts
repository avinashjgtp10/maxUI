import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { LanguageService } from "../../services/language/language.service";
import { ApiCallService } from "../../services/api/api-call.service";
import {FormGroup,FormControl,Validators,FormArray, FormBuilder} from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Storage } from "@ionic/storage";
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
   config = {
     allowNumbersOnly: true,
     length: 6,
     isPasswordInput: false,
     disableAutoFocus: false,
     placeholder: '',
     inputStyles: {
       'width': '40px',
       'height': '40px'
     }
   };
   onOtpChange(otp) {
     this.otp = otp;
     this.showWrongOtpError = false;
     if(this.otp.length === 6) {
      this.isOtpButtonDisabled = false;
     } else {
      this.isOtpButtonDisabled = true;
     }
   }

  slideOpts = {
    initialSlide: 0,
    speed: 700,
    autoplay:true,
    loop:true
  };
  slideImages=[
      "../../../assets/img/img 1.svg",
      "../../../assets/img/img2 2.svg",
    "../../../assets/img/Group 45.svg",
    "../../../assets/img/img_call.svg",
    "../../../assets/img/Component 3.svg"
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
    private storage:Storage ) { 
  }
  
  slideToPrevious() {
    this.loginSlider.slidePrev();
  }
  setVal(val) {
    this.ngOtpInput.setValue(val);
  }
  checkOtpEntered(){
    this.showWrongOtpError = false;
    let args = {
      tel_number : `${this.mobileNumberEntered}`,
      code :this.otp,
      channel :"SMS"
    }
    this.storage.get('Session_Id').then((val) => {
      console.log('Session_Id',val);
      this.apiService.verifyOtp(args,val).subscribe((response: any) => {
        console.log('response',response);
        if(response.Status === 'Success'){
            this.showWrongOtpError = false;
          } else {  
              this.setVal('');       
              this.showWrongOtpError = true;
              this.isOtpButtonDisabled = true;
          }
      });
    });
    
      // let myOtp = '123456';
      // if(this.otp === myOtp){
      //   this.showWrongOtpError = false;
      // } else {  
      //     this.setVal('');       
      //     this.showWrongOtpError = true;
      //     this.isOtpButtonDisabled = true;
      // }
  }
  onSubmit(){
     this.mobileNumberEntered = this.form.value.mobileNumber;
    let args = {
      tel_number: `+91${this.mobileNumberEntered}`,
      channel :"SMS"
    }
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
    });
  }
  slideToGetCall(){
    // this.resendCounter = 60;
    // this.loginSlider.slideNext();
    // this.imageSlider.slideTo(3);
    // this.imageSlider.lockSwipes(true);
    // this.setVal('');
    // this.timer();
    let args = {
      tel_number: `${this.mobileNumberEntered}`,
      channel :"voice"
    }
    this.apiService.getCall(args).subscribe((response: any) => {
      console.log('response',response);
      if(response.Status === 'Success'){
        this.resendCounter = 60;
        this.loginSlider.slideNext();
        this.imageSlider.slideTo(3);
        this.imageSlider.lockSwipes(true);
        this.setVal('');
        this.timer();
      }
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
        this.imageSlider.slideTo(4);
        this.imageSlider.lockSwipes(true);
      }
    }, 1000);
  }
  goToDashboard(){
    let id="65"
    this.route.navigate(["dashboard-with-id",id])
    
    console.log("Hey this is dashboard")
  }

}
