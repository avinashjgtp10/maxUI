import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingDashboardPageRoutingModule } from './training-dashboard-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { TrainingDashboardPage } from './training-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    TrainingDashboardPageRoutingModule
  ],
  declarations: [TrainingDashboardPage]
})
export class TrainingDashboardPageModule {}
