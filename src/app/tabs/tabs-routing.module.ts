import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'main',
    component: TabsPage,

    children: [
      {
        path: 'leagues',
        loadChildren: () => import('../pages/leagues/leagues.module').then( m => m.LeaguesPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../pages/add-form/add-form.module').then( m => m.AddFormPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'main/leagues',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
