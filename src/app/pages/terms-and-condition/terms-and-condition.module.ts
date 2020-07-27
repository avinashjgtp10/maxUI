import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndConditionPageRoutingModule } from './terms-and-condition-routing.module';

import { TermsAndConditionPage } from './terms-and-condition.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndConditionPageRoutingModule
  ],
  declarations: [TermsAndConditionPage]
})
export class TermsAndConditionPageModule {}
