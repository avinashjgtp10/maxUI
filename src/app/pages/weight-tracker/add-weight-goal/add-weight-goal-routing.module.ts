import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWeightGoalPage } from './add-weight-goal.page';

const routes: Routes = [
  {
    path: '',
    component: AddWeightGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWeightGoalPageRoutingModule {}
