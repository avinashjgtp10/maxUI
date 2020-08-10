import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { InsightsPageRoutingModule } from './insights-routing.module';

import { InsightsPage } from './insights.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    InsightsPageRoutingModule
  ],
  declarations: [InsightsPage]
})
export class InsightsPageModule {}
