import { RouterConfig } from '@angular/router';

import { BookHoursComponent } from './index';
import { AMHoursComponent } from './amhours/index';
import { KTHoursComponent } from './kthours/index';
import { FixedHoursComponent } from './fixedhours/index';
import { AuthGuard } from '../shared/guards/index';

export const BookHoursRoutes: RouterConfig = [
  {
    path: 'bookhours',
    component: BookHoursComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: ''
      },
      {
        path: 'amhours',
        component: AMHoursComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'kthours',
        component: KTHoursComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fixedhours',
        component: FixedHoursComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
