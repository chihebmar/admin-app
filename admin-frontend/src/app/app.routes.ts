import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PermissionManagementComponent } from './features/permissions/permissions.component';
import { PartnerListComponent } from './features/partners/partner-list/partner-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'permissions',
        component: PermissionManagementComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'clients',
        component: PartnerListComponent,
        data: {
          partnerTypeCodeRef: 'PARTNER_TYPE_CLIENT',
        },
      },
      {
        path: 'suppliers',
        component: PartnerListComponent,
        data: {
          partnerTypeCodeRef: 'PARTNER_TYPE_SUPPLIER',
        },
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
