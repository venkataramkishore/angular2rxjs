import { RouterConfig } from '@angular/router';

import {OffshorePriceComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const OffshorePriceRoutes: RouterConfig = [
  {
    path: 'offshoreprices',
    component: OffshorePriceComponent,
    canActivate:[AuthGuard]
  }
];
