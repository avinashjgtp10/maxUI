import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { IonSlides } from '@ionic/angular';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {
  inputWeight: number = 40;
  userMobileNumber: number;
  @ViewChild('profileFormSlider', { static: false }) profileFormSlider: IonSlides;
  profileFormSliderOpts = {
    initialSlide: 0,
    allowTouchMove: true,
    speed: 400
  };
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['',  [Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    phone: ['',  [Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
    gender: ['male',Validators.required],
    age: ['',Validators.required],
    height: ['',Validators.required],
    weight: [this.inputWeight,Validators.required],
    goal: ['',Validators.required],
  });
  constructor(private formBuilder: FormBuilder,
              private storage:Storage) { }

  ngOnInit() {
    this.storage.get('User_Mobile_No').then((number: number)=> {
      console.log('number',number);
       this.userMobileNumber = number;
       this.registrationForm.controls.phone.setValue(this.userMobileNumber);
    }).catch((err)=> {
      this.userMobileNumber = 0;
    })
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
    height: [
      { type: 'required', message: 'Height selection is required' }
    ],
    goal: [
      { type: 'required', message: 'Goal selection is required' }
    ],
  };
  public submit() {
    console.log(this.registrationForm.value);
    this.profileFormSlider.slideNext();
    this.profileFormSlider.lockSwipes(true);
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
