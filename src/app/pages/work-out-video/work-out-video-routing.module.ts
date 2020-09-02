import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOutVideoPage } from './work-out-video.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOutVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOutVideoPageRoutingModule {}
