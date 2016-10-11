import { Route } from '@angular/router';

import { ContractListComponent } from './index';
import { AuthGuard } from '../shared/guards/index';

export const ContractListRoutes: Route[] = [
  {
    path: 'contracts',
    component: ContractListComponent,
    canActivate:[AuthGuard]
  }
];
