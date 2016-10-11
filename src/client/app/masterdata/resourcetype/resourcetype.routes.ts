import {Route} from '@angular/router';

import {ResourceTypeComponent} from './index';
import {AuthGuard} from '../../shared/guards/index';

export const ResourceTypeRoutes: Route[] = [
  {
    path: 'resourcetypes',
    component: ResourceTypeComponent,
    canActivate:[AuthGuard]
  }
];
