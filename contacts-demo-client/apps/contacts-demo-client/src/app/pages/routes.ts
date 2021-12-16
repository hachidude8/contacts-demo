import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '../shared/security';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./login-page').then(m => m.LoginPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts-page').then(m => m.ContactsPageModule),
    canActivate: [AuthenticatedGuard],
    canActivateChild: [AuthenticatedGuard],
    canLoad: [AuthenticatedGuard]
  },
];
