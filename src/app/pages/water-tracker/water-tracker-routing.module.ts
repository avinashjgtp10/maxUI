import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaterTrackerPage } from './water-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: WaterTrackerPage
  },
  {
    path: 'add-water-component',
    loadChildren: () => import('./add-water-component/add-water-component.module').then( m => m.AddWaterComponentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterTrackerPageRoutingModule {}
