import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-calorie',
  templateUrl: './add-calorie.page.html',
  styleUrls: ['./add-calorie.page.scss'],
})
export class AddCaloriePage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 7,
    speed: 400
  };
  constructor() { }

  ngOnInit() {
  }

}
