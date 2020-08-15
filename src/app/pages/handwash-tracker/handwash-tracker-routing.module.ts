import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HandwashTrackerPage } from './handwash-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: HandwashTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandwashTrackerPageRoutingModule {}
