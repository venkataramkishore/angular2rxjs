import { RouterConfig } from '@angular/router';

import {SkillComponent } from './index';
import {AuthGuard} from '../../shared/guards/index';

export const SkillRoutes: RouterConfig = [
  {
    path: 'skills',
    component: SkillComponent,
    canActivate:[AuthGuard]
  }
];
