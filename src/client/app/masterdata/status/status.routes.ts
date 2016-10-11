import { Route } from '@angular/router';

import {StatusComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const StatusRoutes: Route[] = [
  {
    path: 'statuses',
    component: StatusComponent,
    canActivate:[AuthGuard]
  }
];
