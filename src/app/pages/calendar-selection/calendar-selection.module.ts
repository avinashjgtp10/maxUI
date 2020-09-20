import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarSelectionPageRoutingModule } from './calendar-selection-routing.module';

import { CalendarSelectionPage } from './calendar-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarSelectionPageRoutingModule
  ],
  declarations: [CalendarSelectionPage]
})
export class CalendarSelectionPageModule {}
