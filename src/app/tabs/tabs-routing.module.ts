import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pages/training-overview/training-overview.module').then(m => m.TrainingOverviewPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../pages/my-training/my-training.module').then( m => m.MyTrainingPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/work-out-video/work-out-video.module').then(m => m.WorkOutVideoPageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../pages/manage-profile/manage-profile.module').then(m => m.ManageProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
