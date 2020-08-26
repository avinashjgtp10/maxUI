import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GettingStartedTrainingPage } from './getting-started-training.page';

const routes: Routes = [
  {
    path: '',
    component: GettingStartedTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettingStartedTrainingPageRoutingModule {}
