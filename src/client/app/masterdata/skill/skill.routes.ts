import { Route } from '@angular/router';

import {SkillComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const SkillRoutes: Route[] = [
  {
    path: 'skills',
    component: SkillComponent,
    canActivate:[AuthGuard]
  }
];
