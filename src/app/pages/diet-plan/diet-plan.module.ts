import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';

import { DietPlanPageRoutingModule } from './diet-plan-routing.module';

import { DietPlanPage } from './diet-plan.page';
import { BookAppointmentComponent } from 'src/app/components/book-appointment/book-appointment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DietPlanPageRoutingModule
  ],
  declarations: [DietPlanPage, BookAppointmentComponent]
})
export class DietPlanPageModule {}
