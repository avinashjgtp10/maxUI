import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightTrackerPage } from './weight-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: WeightTrackerPage
  },
  {
    path: 'add-weight-goal',
    loadChildren: () => import('./add-weight-goal/add-weight-goal.module').then( m => m.AddWeightGoalPageModule)
  },
  {
    path: 'add-weight-value',
    loadChildren: () => import('./add-weight-value/add-weight-value.module').then( m => m.AddWeightValuePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightTrackerPageRoutingModule {}
