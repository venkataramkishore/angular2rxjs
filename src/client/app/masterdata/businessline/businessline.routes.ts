import { Route } from '@angular/router';

import {BusinessLineComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const BusinessLineRoutes: Route[] = [
  {
    path: 'blines',
    component: BusinessLineComponent,
    canActivate:[AuthGuard]
  }
];
