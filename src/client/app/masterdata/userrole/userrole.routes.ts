import { RouterConfig } from '@angular/router';

import {UserRoleComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const UserRoleRoutes: RouterConfig = [
  {
    path: 'userroles',
    component: UserRoleComponent,
    canActivate:[AuthGuard]
  }
];
