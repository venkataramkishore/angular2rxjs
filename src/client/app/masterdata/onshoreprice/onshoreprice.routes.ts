import { Route } from '@angular/router';

import {OnshorePriceComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const OnshorePriceRoutes: Route[] = [
  {
    path: 'onshoreprices',
    component: OnshorePriceComponent,
    canActivate:[AuthGuard]
  }
];
