import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightTrackerPageRoutingModule } from './weight-tracker-routing.module';

import { WeightTrackerPage } from './weight-tracker.page';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { DateSliderPageModule } from '../date-slider/date-slider.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightTrackerPageRoutingModule,
    RoundProgressModule,
    DateSliderPageModule
  ],
  declarations: [WeightTrackerPage]
})
export class WeightTrackerPageModule {}
