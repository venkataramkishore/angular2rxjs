import { Route } from '@angular/router';

import {RoleComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const RoleRoutes: Route[] = [
  {
    path: 'roles',
    component: RoleComponent,
    canActivate:[AuthGuard]
  }
];
