import { RouterConfig } from '@angular/router';

import {OnshorePriceComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const OnshorePriceRoutes: RouterConfig = [
  {
    path: 'onshoreprices',
    component: OnshorePriceComponent,
    canActivate:[AuthGuard]
  }
];
