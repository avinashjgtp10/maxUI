import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietPlanPage } from './diet-plan.page';

const routes: Routes = [
  {
    path: '',
    component: DietPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietPlanPageRoutingModule {}
