import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWeightGoalPageRoutingModule } from './add-weight-goal-routing.module';

import { AddWeightGoalPage } from './add-weight-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWeightGoalPageRoutingModule
  ],
  declarations: [AddWeightGoalPage]
})
export class AddWeightGoalPageModule {}
