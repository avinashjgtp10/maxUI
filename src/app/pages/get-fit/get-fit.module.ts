import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetFitPageRoutingModule } from './get-fit-routing.module';

import { GetFitPage } from './get-fit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetFitPageRoutingModule
  ],
  declarations: [GetFitPage]
})
export class GetFitPageModule {}
