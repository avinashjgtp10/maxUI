import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaySchedulePage } from './day-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: DaySchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaySchedulePageRoutingModule {}
