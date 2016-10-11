import { Route } from '@angular/router';

import {UserRoleComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const UserRoleRoutes: Route[] = [
  {
    path: 'userroles',
    component: UserRoleComponent,
    canActivate:[AuthGuard]
  }
];
