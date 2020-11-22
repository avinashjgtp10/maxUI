import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOutCompletePageRoutingModule } from './work-out-complete-routing.module';

import { WorkOutCompletePage } from './work-out-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOutCompletePageRoutingModule
  ],
  declarations: [WorkOutCompletePage]
})
export class WorkOutCompletePageModule {}
