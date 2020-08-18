import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightTrackerPageRoutingModule } from './weight-tracker-routing.module';

import { WeightTrackerPage } from './weight-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightTrackerPageRoutingModule
  ],
  declarations: [WeightTrackerPage]
})
export class WeightTrackerPageModule {}
