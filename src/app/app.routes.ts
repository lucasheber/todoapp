import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'item',
    loadComponent: () => import('./item/item.page').then( m => m.ItemPage)
  },
  {
    path: 'item/:id',
    loadComponent: () => import('./item/item.page').then( m => m.ItemPage)
  },
];
