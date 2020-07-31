import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalorieTrackerPageRoutingModule } from './calorie-tracker-routing.module';

import { CalorieTrackerPage } from './calorie-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalorieTrackerPageRoutingModule
  ],
  declarations: [CalorieTrackerPage]
})
export class CalorieTrackerPageModule {}
