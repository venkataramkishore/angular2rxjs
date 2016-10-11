import { Route } from '@angular/router';

import {BandComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const BandRoutes: Route[] = [
  {
    path: 'bands',
    component: BandComponent,
    canActivate:[AuthGuard]
  }
];
