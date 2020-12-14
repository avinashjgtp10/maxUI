import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'AppStartPage',
    loadChildren: () => import('./pages/app-start/app-start.module').then( m => m.AppStartPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },
  {
    path: 'app-start',
    loadChildren: () => import('./pages/app-start/app-start.module').then( m => m.AppStartPageModule)
  },
  {
    path: 'manage-profile',
    loadChildren: () => import('./pages/manage-profile/manage-profile.module').then( m => m.ManageProfilePageModule)
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./pages/terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'training-dashboard',
    loadChildren: () => import('./pages/training-dashboard/training-dashboard.module').then(m => m.TrainingDashboardPageModule)
  },
  {
    path: 'calendar-selection',
    loadChildren: () => import('./pages/calendar-selection/calendar-selection.module').then( m => m.CalendarSelectionPageModule)
  },
  {
    path: 'diet-plan',
    loadChildren: () => import('./pages/diet-plan/diet-plan.module').then( m => m.DietPlanPageModule),
    canActivate:[AuthGuard],
    data: { plan : 'premium'}
  },
  
  {
    path: 'tab4',
    loadChildren: () => import('./pages/my-plan/my-plan.module').then(m => m.MyPlanPageModule),
    
  },
  {
    path: 'my-plan',
    loadChildren: () => import('./pages/my-plan/my-plan.module').then( m => m.MyPlanPageModule)
  },
  {
    path: "gettingStarted",
    loadChildren: () =>
      import(
        "./pages/getting-started-training/getting-started-training.module"
      ).then((m) => m.GettingStartedTrainingPageModule),
  },
  {
    path: 'work-out-complete',
    loadChildren: () => import('./pages/work-out-complete/work-out-complete.module').then( m => m.WorkOutCompletePageModule)
  },
  {
    path:'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule )
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
