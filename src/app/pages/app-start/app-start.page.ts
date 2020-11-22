import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router"
import { Route } from '@angular/compiler/src/core';
import { LanguageService } from "../../services/language/language.service";
import { ApiCallService } from "../../services/api/api-call.service";
import {FormGroup,FormControl,Validators,FormArray, FormBuilder} from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { NavController } from '@ionic/angular';
declare var SMSReceive: any;
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
   resendSMSCounter: number = 3;
   serverError: string = '';
   resendCounter: number = 30;
   otp: string;
   termsIsChecked: boolean = true;
   showResendCounter: boolean = false;
   showResendAndGetCallButton: boolean = false;
   mobileNumberEntered: string;
   showWrongOtpError: boolean = false;
   isOtpButtonDisabled: boolean = true;
   showCall: boolean = false;
   showHelp: boolean = false;
   sliderPager: boolean = true;
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
     disableAutoFocus: true,
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
    public loadingService: LoadingContollerService,
    private navController: NavController) { 
  }

  start() {
    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          var IncomingSMS = e.data;
          console.log('IncomingSMS',IncomingSMS);
          this.processSMS(IncomingSMS);
        });
      },
      () => { console.log('watch start failed') }
    )
  }

  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped') },
      () => { console.log('watch stop failed') }
    )
  }

  processSMS(data) {
    if(data.address) {
      let message = data.body;
      let autoOtp = message.split(' ');
      this.setVal(autoOtp[0]);
      console.log('message',message);
    } else {
      this.stop();
    }
  }
  
  slideToPrevious() {
    this.loginSlider.slidePrev();
  }
  setVal(val) {
    this.ngOtpInput.setValue(val);
    this.ngOtpInputCall.setValue(val);
  }
  openTermsPage() {
    this.route.navigate(["terms-and-condition"]);
  }
  checkOtpEntered(){
    this.serverError = '';
    this.showWrongOtpError = false;
    let myOtp = '1234';
    let args = {
      tel_number : `${this.mobileNumberEntered}`,
      code :this.otp,
      channel :"SMS",
      access: "client"
    }
    this.loadingService.loadingPresent();
    this.storage.get('Session_Id').then((val) => {
      this.apiService.verifyOtp(args,val).subscribe((response: any) => {
        
        this.loadingService.loadingDismiss();
        if(response.status === "success"){
          console.log("success",response);
            this.showWrongOtpError = false;
            this.storage.set('User_Data', response.data).then(() => {
              if(response.data.userDesc === 'old') {
                
                localStorage.setItem('c_id',response.data.c_id);
                console.log("app start",localStorage.getItem('c_id'))
                this.getProfileData()
                this.navController.navigateRoot(['home']);
              } else {
                this.navController.navigateRoot(['manage-profile']);
              }
            }).catch((err)=> {
              //this.serverError = err;
           });
          } else {  
              this.setVal('');       
              this.showWrongOtpError = true;
              this.isOtpButtonDisabled = true;
          }
      }, (error) => {
        this.loadingService.loadingDismiss();
        console.log("error",error);
        this.serverError = error;
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


  getProfileData() {
    this.apiService.getProfileData(localStorage.getItem('c_id')).subscribe((response: any) => {
      localStorage.setItem('plan',response.plan);
    }, (error) => {
      console.log("error",error);
    });
  }

  onSubmit(){
    this.serverError = '';
     this.mobileNumberEntered = this.form.value.mobileNumber;
    let args = {
      tel_number: `+91${this.mobileNumberEntered}`,
      channel :"SMS"
    }
    this.loadingService.loadingPresent();
    this.apiService.generateOtp(args).subscribe((response: any) => {
      console.log('response',response);
      this.loadingService.loadingDismiss();
      if(response.Status === 'Success'){
           this.storage.set('Session_Id',response.Details).then(()=>{
            this.loginSlider.slideNext();
            this.setVal('');
            this.timerTick();
            this.showResendCounter = true;
            this.showResendAndGetCallButton = false;
            this.resendCounter = 30;
            this.start();
           }).catch((err)=> {
           // this.serverError = err;
        });
      }
    }, (error) => {
      this.serverError = error;
      this.loadingService.loadingDismiss();
      console.log("error",error);
    });
  }
  resendOtp() {
     this.serverError = '';
     this.showWrongOtpError = false;
     this.resendSMSCounter--;
     console.log(' this.resendSMSCounter', this.resendSMSCounter);
     if(this.resendSMSCounter) { 
      let args = {
        tel_number: `+91${this.mobileNumberEntered}`,
        channel :"SMS"
      }
      this.loadingService.loadingPresent();
      this.apiService.generateOtp(args).subscribe((response: any) => {
        console.log('response',response);
        this.loadingService.loadingDismiss();
        if(response.Status === 'Success'){
             this.storage.set('Session_Id',response.Details).then(()=> {
              this.setVal('');
              this.timerTick();
              this.showResendCounter = true;
              this.showResendAndGetCallButton = false;
              this.resendCounter = 30;
             }).catch((err)=> {
                // this.serverError = err;
             });
        }
      }, (error) => {
        this.serverError = error;
        this.loadingService.loadingDismiss();
        console.log("error",error);
      });
     } else {
      this.loginSlider.slideTo(4);
      this.imageSlider.lockSwipes(false);
      this.showHelp = true;
      this.imageSlider.slideTo(5);
      this.imageSlider.lockSwipes(true);
     }
  }
  slideToGetCall(){
    this.serverError = '';
    let args = {
      tel_number: `${this.mobileNumberEntered}`,
      channel :"voice"
    }
    this.loadingService.loadingPresent();
    this.apiService.getCall(args).subscribe((response: any) => {
      console.log('response',response);
      this.loadingService.loadingDismiss();
      if(response.Status === 'Success'){
        this.resendCounter = 60;
        this.loginSlider.slideNext();
        this.showCall = true;
        this.sliderPager = false;
        this.imageSlider.slideTo(4);
        this.imageSlider.lockSwipes(true);
        this.setVal('');
        this.timer();
      }
  }, (error) => {
    this.serverError = error;
    this.loadingService.loadingDismiss();
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
        this.showHelp = true;
        this.imageSlider.slideTo(5);
        this.imageSlider.lockSwipes(true);
      }
    }, 1000);
  }
  goToDashboard(){
    let id="65"
    console.log("dashboard")
    this.route.navigate(["dashboard-with-id",id]);
    console.log("Hey this is dashboard")
  }

}
