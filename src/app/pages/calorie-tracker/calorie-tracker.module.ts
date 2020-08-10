import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';

import { CalorieTrackerPageRoutingModule } from './calorie-tracker-routing.module';

import { CalorieTrackerPage } from './calorie-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CalorieTrackerPageRoutingModule
  ],
  declarations: [CalorieTrackerPage]
})
export class CalorieTrackerPageModule {}
