import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HandwashTrackerPageRoutingModule } from './handwash-tracker-routing.module';

import { HandwashTrackerPage } from './handwash-tracker.page';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { DateSliderPageModule } from '../date-slider/date-slider.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundProgressModule,
    HandwashTrackerPageRoutingModule,
    DateSliderPageModule
  ],
  declarations: [HandwashTrackerPage]
})
export class HandwashTrackerPageModule {}
