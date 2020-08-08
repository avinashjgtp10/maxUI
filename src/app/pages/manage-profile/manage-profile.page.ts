import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { IonSlides } from '@ionic/angular';
import { Router,ActivatedRoute } from "@angular/router"
import { Storage } from "@ionic/storage";
import { ApiCallService } from "../../services/api/api-call.service";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Options } from 'ng5-slider';
import { LoadingContollerService } from "../../services/loading/loading-contoller.service";
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {
  inputWeight: number = 40;
  isEditProfile: boolean = false;
  userMobileNumber: number;
  imageResponse: any;
  imageUrl: string = 'assets/img/manage-profile/avatar.svg';
  serverError: string = '';
  showImg: boolean = false;
  options: any;
  ageOptions: any = [];
  ageCount: number = 60;
  height: number = 4.5;
  opt: Options = {
    floor: 4,
    ceil: 7,
    showTicks: true,
    translate: (value: number): string => {
      return  value + 'ft';
    },
      stepsArray: [
      {value: 4},
      {value: 4.1},
      {value: 4.2},
      {value: 4.3},
      {value: 4.4},
      {value: 4.5, legend: '4.5ft'},
      {value: 4.6},
      {value: 4.7},
      {value: 4.8},
      {value: 4.9},
      {value: 5},
      {value: 5.1},
      {value: 5.2},
      {value: 5.3},
      {value: 5.4},
      {value: 5.5, legend: '5.5ft'},
      {value: 5.6},
      {value: 5.7},
      {value: 5.8},
      {value: 5.9},
      {value: 6},
      {value: 6.1},
      {value: 6.2},
      {value: 6.3},
      {value: 6.4},
      {value: 6.5, legend: '6.5ft'},
      {value: 6.6},
      {value: 6.7},
      {value: 6.8},
      {value: 6.9},
      {value: 7},
    ]
  };
  @ViewChild('profileFormSlider', { static: false }) profileFormSlider: IonSlides;
  profileFormSliderOpts = {
    initialSlide: 0,
    allowTouchMove: false,
    speed: 400
  };
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['',  [Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    phone: ['',  [Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
    gender: ['male',Validators.required],
    age: ['',Validators.required],
    // height: ['',Validators.required],
    weight: [this.inputWeight,Validators.required],
    goal: ['',Validators.required],
  });
  constructor(private formBuilder: FormBuilder,
              private storage:Storage, private imagePicker: ImagePicker,
              private route:Router,
              public apiService: ApiCallService,
              public loadingService: LoadingContollerService,
              private navController: NavController) { }

  ngOnInit() {
     if(localStorage.getItem('c_id')) {
      this.isEditProfile = true;
      this.getProfileData();
     }
    this.storage.get('User_Data').then((data: any)=> {
      this.registrationForm.controls.phone.setValue(data.phonenumber);
    }).catch((err)=> {
      this.serverError = err;
    });
   for(let i = 10; i <= this.ageCount; i++) {
     this.ageOptions.push({ 
       value: i,
       displayName: `${i} Years`
     });
   }
  }
  getProfileData() {
    this.loadingService.loadingPresent();
    this.serverError = '';
    this.apiService.getProfileData(localStorage.getItem('c_id')).subscribe((response: any) => {
      console.log('response',response);
      this.registrationForm.controls.name.setValue(response.c_name);
      this.registrationForm.controls.email.setValue(response.c_email);
      this.registrationForm.controls.gender.setValue(response.c_gender);
      this.registrationForm.controls.age.setValue(parseInt(response.c_age));
      this.registrationForm.controls.weight.setValue(parseInt(response.c_weight));
      this.height = parseInt(response.c_height);
      this.registrationForm.controls.goal.setValue(response.c_fitnessobjective);
      this.loadingService.loadingDismiss();
    }, (error) => {
      this.serverError = error;
      this.loadingService.loadingDismiss();
      console.log("error",error);
    });
  }
  saveEditProfile() {
    this.loadingService.loadingPresent();
    this.serverError = '';
    this.storage.get('User_Data').then((data: any)=> {
      if (data && data.token) {
        let args = {
          c_email :this.registrationForm.value.email,
          c_gender :this.registrationForm.value.gender,
          c_age : this.registrationForm.value.age,
          c_weight: this.registrationForm.value.weight,
          c_height: this.height,
          u_id : data.id,
          c_fitnessobjective :this.registrationForm.value.goal,
          c_name :this.registrationForm.value.name
        }
        console.log('args',args);
        this.apiService.updateProfileData(args,localStorage.getItem('c_id')).subscribe((response: any) => {
          console.log('response',response);
          this.loadingService.loadingDismiss();
        }, (error) => {
          this.serverError = error;
          this.loadingService.loadingDismiss();
          console.log("error",error);
        });
        } else {
          this.loadingService.loadingDismiss();
          this.serverError = "Something Went Wrong. Please Try Again Later";
        }
    });
  }
  public getImages() {
    this.options = {
      maximumImagesCount: 1,
      width: 200,
      quality: 100,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      console.log('result',results);
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
      if(results === 'OK') {
        this.imageUrl = 'assets/img/manage-profile/avatar.svg';
        this.showImg = false;
      } else {
        this.imageUrl = this.imageResponse[0];
        this.showImg = true;
      }
    }, (err) => {
      alert(err);
    });
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    gender: [
      { type: 'required', message: 'Gender selection is required' }
    ],
    age: [
      { type: 'required', message: 'Age selection is required' }
    ],
    goal: [
      { type: 'required', message: 'Goal selection is required' }
    ],
  };
  public submit() {
    this.loadingService.loadingPresent();
    this.serverError = '';
    this.storage.get('User_Data').then((data: any)=> {
      if (data && data.token) {
        let args = {
          c_email :this.registrationForm.value.email,
          c_gender :this.registrationForm.value.gender,
          c_age : this.registrationForm.value.age,
          c_weight: this.registrationForm.value.weight,
          c_height: this.height,
          u_id : data.id,
          c_fitnessobjective :this.registrationForm.value.goal,
          c_name :this.registrationForm.value.name
        }
        this.apiService.storeProfileData(args).subscribe((response: any) => {
          let value = {...response.data[0],'userDesc':response.userDesc};
            this.storage.set('User_Data',value).then((res)=>{
             localStorage.setItem('c_id',response.data[0].c_id);
             this.loadingService.loadingDismiss();
             this.navController.navigateRoot(['home']);
            }).catch((err)=> {
              this.serverError = err;
              this.loadingService.loadingDismiss();
            });
        }, (error) => {
          this.serverError = error;
          this.loadingService.loadingDismiss();
          console.log("error",error);
        });
        } else {
          this.loadingService.loadingDismiss();
          this.serverError = "Something Went Wrong. Please Try Again Later";
        }
    });
  }
  public decreaseWeight(){
   console.log('decrease weight');
   this.inputWeight--;
  }
  public increaseWeight(){
    console.log('increase weight');
    this.inputWeight++;
  }
  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
}
