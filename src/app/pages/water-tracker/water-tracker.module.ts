import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaterTrackerPageRoutingModule } from './water-tracker-routing.module';

import { WaterTrackerPage } from './water-tracker.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DateSliderPageModule } from '../date-slider/date-slider.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaterTrackerPageRoutingModule,
    NgCircleProgressModule,
    DateSliderPageModule
  ],
  declarations: [WaterTrackerPage]
})
export class WaterTrackerPageModule {}
