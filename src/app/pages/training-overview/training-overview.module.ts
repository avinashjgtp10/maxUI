import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingOverviewPageRoutingModule } from './training-overview-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { TrainingOverviewPage } from './training-overview.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    TrainingOverviewPageRoutingModule
  ],
  declarations: [TrainingOverviewPage]
})
export class TrainingOverviewPageModule {}
