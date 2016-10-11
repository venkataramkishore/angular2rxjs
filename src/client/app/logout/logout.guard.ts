import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

import {SessionStorageService} from 'ng2-webstorage';

import { LoginService} from '../shared/index';


@Injectable()
export class LogoutGuard implements CanActivate {
    constructor(private loginService: LoginService,
                private sessionSt:SessionStorageService,
                private router: Router) {}
  canActivate() {
    console.log('LogoutGuard#canActivate called');
    if(this.loginService.isAuthenticated) {
        this.sessionSt.clear('user');
        this.router.navigate(['/']);
    }
    return true;
  }
}
