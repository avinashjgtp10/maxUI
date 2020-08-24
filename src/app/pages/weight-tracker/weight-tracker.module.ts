import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightTrackerPageRoutingModule } from './weight-tracker-routing.module';

import { WeightTrackerPage } from './weight-tracker.page';
import { RoundProgressModule } from 'angular-svg-round-progressbar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightTrackerPageRoutingModule,
    RoundProgressModule
  ],
  declarations: [WeightTrackerPage]
})
export class WeightTrackerPageModule {}
