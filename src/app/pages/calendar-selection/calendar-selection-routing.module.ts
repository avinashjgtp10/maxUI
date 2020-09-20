import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarSelectionPage } from './calendar-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarSelectionPageRoutingModule {}
