import { Routes } from '@angular/router';


import { LoginRoutes } from './login/login.routes';
import { ContractListRoutes } from './contracts/contract-list.routes';
import { RegisterRoutes }  from './register/register.routes';
import { MasterDataRoutes } from './masterdata/index';
import { BookHoursRoutes } from './book_hours/index';
import { LogoutRoutes, LogoutGuard } from './logout/index';
import { AuthGuard } from './shared/guards/index';

import { LoginService, NavbarService, FixedHoursService } from './shared/services/index';
/**
 * All Application routes configured under one variable.
 */
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  ...LoginRoutes,
  ...LogoutRoutes,
  ...ContractListRoutes,
  ...BookHoursRoutes,
  ...MasterDataRoutes,
  ...RegisterRoutes
];

/**
 * All providers applicable for the global scope.
 */
export const APP_PROVIDERS = [
   NavbarService
];

export const APP_GUARD = [
  AuthGuard,
  LogoutGuard,
  /*
  {
  provide: AuthGuard,
  useFactory: (loginService:LoginService, navbarService: NavbarService) => {
    //TODO
  },
  deps: [LoginService, NavbarService]
  },
  {
  provide: LogoutGuard,
  useFactory: (loginService:LoginService) => {
    //TODO
  },
  deps: [LoginService]
  }*/
];
