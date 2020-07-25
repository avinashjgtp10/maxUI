import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { IonSlides } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {
  inputWeight: number = 40;
  userMobileNumber: number;
  imageResponse: any;
  options: any;
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
              private storage:Storage, private imagePicker: ImagePicker) { }

  ngOnInit() {
    this.storage.get('User_Data').then((data: any)=> {
      this.registrationForm.controls.phone.setValue(data.phonenumber);
    }).catch((err)=> {
      this.userMobileNumber = 0;
    })
  }
  public getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 100,

      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
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
