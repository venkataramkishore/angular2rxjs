import { RouterConfig } from '@angular/router';

import {StayComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const StayRoutes: RouterConfig = [
  {
    path: 'stayTypes',
    component: StayComponent,
    canActivate:[AuthGuard]
  }
];
