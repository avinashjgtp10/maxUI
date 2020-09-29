import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';

import { DietPlanPageRoutingModule } from './diet-plan-routing.module';

import { DietPlanPage } from './diet-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DietPlanPageRoutingModule
  ],
  declarations: [DietPlanPage]
})
export class DietPlanPageModule {}
