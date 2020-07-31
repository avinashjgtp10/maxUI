import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalorieTrackerPage } from './calorie-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: CalorieTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalorieTrackerPageRoutingModule {}
