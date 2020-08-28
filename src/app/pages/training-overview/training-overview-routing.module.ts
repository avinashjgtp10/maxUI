import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingOverviewPage } from './training-overview.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingOverviewPageRoutingModule {}
