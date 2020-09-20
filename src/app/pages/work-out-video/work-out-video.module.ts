import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOutVideoPageRoutingModule } from './work-out-video-routing.module';

import { WorkOutVideoPage } from './work-out-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOutVideoPageRoutingModule
  ],
  declarations: [WorkOutVideoPage]
})
export class WorkOutVideoPageModule {}
