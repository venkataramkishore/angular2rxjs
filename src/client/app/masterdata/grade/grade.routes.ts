import { Route } from '@angular/router';

import {GradeComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const GradeRoutes: Route[] = [
  {
    path: 'grades',
    component: GradeComponent,
    canActivate:[AuthGuard]
  }
];
