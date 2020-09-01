import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTrainingPageRoutingModule } from './my-training-routing.module';

import { MyTrainingPage } from './my-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTrainingPageRoutingModule
  ],
  declarations: [MyTrainingPage]
})
export class MyTrainingPageModule {}
