import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: 'product', loadChildren: () => import('./modules').then(m => m.productRoutes) },
];
