import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaySchedulePageRoutingModule } from './day-schedule-routing.module';

import { DaySchedulePage } from './day-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaySchedulePageRoutingModule
  ],
  declarations: [DaySchedulePage]
})
export class DaySchedulePageModule {}
