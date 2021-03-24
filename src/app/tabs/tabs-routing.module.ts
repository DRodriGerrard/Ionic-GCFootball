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
