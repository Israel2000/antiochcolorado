import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'sermons',
        loadComponent: () =>
          import('./pages/sermons/sermons.page').then((m) => m.SermonsPage),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/events/events.page').then((m) => m.EventsPage),
      },
      {
        path: 'give',
        loadComponent: () =>
          import('./pages/give/give.page').then((m) => m.GivePage),
      },
      {
        path: 'more',
        loadComponent: () =>
          import('./pages/more/more.page').then((m) => m.MorePage),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'tabs/home' },
];
