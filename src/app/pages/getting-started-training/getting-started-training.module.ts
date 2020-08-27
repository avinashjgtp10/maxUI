import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GettingStartedTrainingPageRoutingModule } from './getting-started-training-routing.module';

import { GettingStartedTrainingPage } from './getting-started-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GettingStartedTrainingPageRoutingModule
  ],
  declarations: [GettingStartedTrainingPage]
})
export class GettingStartedTrainingPageModule {}
