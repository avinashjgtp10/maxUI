import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingDashboardPage } from './training-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDashboardPageRoutingModule {}
