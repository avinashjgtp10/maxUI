import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWaterComponentPageRoutingModule } from './add-water-component-routing.module';

import { AddWaterComponentPage } from './add-water-component.page';
import { ToastProvider } from 'src/app/services/toast/toast';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWaterComponentPageRoutingModule,
    
  ],
  declarations: [AddWaterComponentPage],
  providers: [ToastProvider]
})
export class AddWaterComponentPageModule {}
