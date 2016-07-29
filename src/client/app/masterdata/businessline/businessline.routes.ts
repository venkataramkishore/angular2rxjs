import { RouterConfig } from '@angular/router';

import {BusinessLineComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const BusinessLineRoutes: RouterConfig = [
  {
    path: 'blines',
    component: BusinessLineComponent,
    canActivate:[AuthGuard]
  }
];
