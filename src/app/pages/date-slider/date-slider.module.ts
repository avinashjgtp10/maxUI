import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateSliderPageRoutingModule } from './date-slider-routing.module';

import { DateSliderPage } from './date-slider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateSliderPageRoutingModule
  ],
  declarations: [DateSliderPage]
})
export class DateSliderPageModule {}
