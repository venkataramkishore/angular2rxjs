import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

import {SessionStorageService} from 'ng2-webstorage';
import {User} from '../models/index';

import {LoginService, NavbarService} from '../index';

@Injectable()
export class AuthGuard implements CanActivate {
    public activeUser:User;
    public allowRoute:boolean = false;
    constructor(private loginService: LoginService,
                private navBarService:NavbarService,
                private sessionSt:SessionStorageService,
                private router: Router) {}

  canActivate() {
    console.log('AuthGuard#canActivate called');
    if(!this.loginService.isAuthenticated()) {
      let loginUser:User = this.sessionSt.retrieve('user');
      if(loginUser) {
        this.navBarService.changeToUserMenu(loginUser);
        return true;
      }else {
        this.navBarService.changeToDefaultMenu();
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}
