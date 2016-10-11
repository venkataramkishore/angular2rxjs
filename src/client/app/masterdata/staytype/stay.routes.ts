import { Route } from '@angular/router';

import {StayComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const StayRoutes: Route[] = [
  {
    path: 'stayTypes',
    component: StayComponent,
    canActivate:[AuthGuard]
  }
];
