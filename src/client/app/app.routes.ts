import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { LoginRoutes } from './shared/login/login.routes';
import { ContractListRoutes } from './contracts/contract-list.routes';
import { RegisterRoutes }  from './register/register.routes';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...LoginRoutes,
  ...ContractListRoutes,
  ...RegisterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
