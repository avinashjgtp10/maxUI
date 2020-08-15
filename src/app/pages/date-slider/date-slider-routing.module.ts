import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateSliderPage } from './date-slider.page';

const routes: Routes = [
  {
    path: '',
    component: DateSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateSliderPageRoutingModule {}
