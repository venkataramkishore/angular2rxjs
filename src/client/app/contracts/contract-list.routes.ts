import { RouterConfig } from '@angular/router';

import { ContractListComponent } from './index';
import {AuthGuard} from '../shared/guards/index';

export const ContractListRoutes: RouterConfig = [
  {
    path: 'contracts',
    component: ContractListComponent,
    canActivate:[AuthGuard]
  }
];
