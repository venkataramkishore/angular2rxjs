import { RouterConfig } from '@angular/router';

import {GradeComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const GradeRoutes: RouterConfig = [
  {
    path: 'grades',
    component: GradeComponent,
    canActivate:[AuthGuard]
  }
];
