import { Route } from '@angular/router';

import { BookHoursComponent } from './index';
import { AMHoursComponent } from './amhours/index';
import { KTHoursComponent } from './kthours/index';
import { FixedHoursComponent } from './fixedhours/index';
import { AuthGuard } from '../shared/guards/index';

export const BookHoursRoutes: Route[] = [
  {
    path: 'bookhours',
    component: BookHoursComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'amhours',
        component: AMHoursComponent
      },
      {
        path: 'kthours',
        component: KTHoursComponent
      },
      {
        path: 'fixedhours',
        component: FixedHoursComponent
      }
    ]
  }
];
