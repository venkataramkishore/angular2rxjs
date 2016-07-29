import { RouterConfig } from '@angular/router';

import {StatusComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const StatusRoutes: RouterConfig = [
  {
    path: 'statuses',
    component: StatusComponent,
    canActivate:[AuthGuard]
  }
];
