import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcriptionModalPageRoutingModule } from './subcription-modal-routing.module';

import { SubcriptionModalPage } from './subcription-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcriptionModalPageRoutingModule
  ],
  declarations: [SubcriptionModalPage]
})
export class SubcriptionModalPageModule {}
