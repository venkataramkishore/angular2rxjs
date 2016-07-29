import { RouterConfig } from '@angular/router';

import {BandComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const BandRoutes: RouterConfig = [
  {
    path: 'bands',
    component: BandComponent,
    canActivate:[AuthGuard]
  }
];
