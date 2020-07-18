import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'AppStartPage',
    loadChildren: () => import('./pages/app-start/app-start.module').then( m => m.AppStartPageModule)
  },
  {
    path: '',
    redirectTo: 'manage-profile',
    pathMatch: 'full'
  },
  {
    path: 'app-start',
    loadChildren: () => import('./pages/app-start/app-start.module').then( m => m.AppStartPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboard-with-id',
    loadChildren: () => import('./pages/dashboard-with-id/dashboard-with-id.module').then( m => m.DashboardWithIdPageModule)
  },
  {
    path: 'manage-profile',
    loadChildren: () => import('./pages/manage-profile/manage-profile.module').then( m => m.ManageProfilePageModule)
  },
  {
    path: 'manage-pro',
    loadChildren: () => import('./pages/manage-pro/manage-pro.module').then( m => m.ManageProPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
