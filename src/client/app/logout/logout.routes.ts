import { Route } from '@angular/router';

import { LogoutComponent } from './index';
import { LogoutGuard } from './logout.guard';

export const LogoutRoutes: Route[] = [
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [ LogoutGuard ]
  }
];
