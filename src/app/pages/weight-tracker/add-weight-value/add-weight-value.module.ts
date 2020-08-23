import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWeightValuePageRoutingModule } from './add-weight-value-routing.module';

import { AddWeightValuePage } from './add-weight-value.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWeightValuePageRoutingModule
  ],
  declarations: [AddWeightValuePage]
})
export class AddWeightValuePageModule {}
