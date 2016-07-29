import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { LoginRoutes } from './shared/login/login.routes';
import { ContractListRoutes } from './contracts/contract-list.routes';
import { RegisterRoutes }  from './register/register.routes';
import {ResourceTypeRoutes, BusinessLineRoutes, GradeRoutes,
  RoleRoutes, SkillRoutes, BandRoutes, OffshorePriceRoutes,
  OnshorePriceRoutes, StatusRoutes, StayRoutes, UserRoleRoutes} from './masterdata/index';
import {LogoutRoutes, LogoutGuard} from './shared/logout/index';
import { AuthGuard } from './shared/guards/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...LoginRoutes,
  ...ContractListRoutes,
  ...RegisterRoutes,
  ...LogoutRoutes,
  ...ResourceTypeRoutes,
  ...GradeRoutes,
  ...RoleRoutes,
  ...SkillRoutes,
  ...BusinessLineRoutes,
  ...BandRoutes,
  ...OffshorePriceRoutes,
  ...OnshorePriceRoutes,
  ...StatusRoutes,
  ...StayRoutes,
  ...UserRoleRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  LogoutGuard,
  AuthGuard
];
