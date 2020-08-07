import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCaloriePageRoutingModule } from './add-calorie-routing.module';

import { AddCaloriePage } from './add-calorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCaloriePageRoutingModule
  ],
  declarations: [AddCaloriePage]
})
export class AddCaloriePageModule {}
