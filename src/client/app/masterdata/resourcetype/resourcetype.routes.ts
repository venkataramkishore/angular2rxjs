import {RouterConfig} from '@angular/router';

import {ResourceTypeComponent} from './index';
import {AuthGuard} from '../../shared/guards/index';

export const ResourceTypeRoutes: RouterConfig = [
  {
    path: 'resourcetypes',
    component: ResourceTypeComponent,
    canActivate:[AuthGuard]
  }
];
