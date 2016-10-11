import { Route } from '@angular/router';

import {OffshorePriceComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const OffshorePriceRoutes: Route[] = [
  {
    path: 'offshoreprices',
    component: OffshorePriceComponent,
    canActivate:[AuthGuard]
  }
];
