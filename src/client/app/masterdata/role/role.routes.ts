import { RouterConfig } from '@angular/router';

import {RoleComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const RoleRoutes: RouterConfig = [
  {
    path: 'roles',
    component: RoleComponent,
    canActivate:[AuthGuard]
  }
];
