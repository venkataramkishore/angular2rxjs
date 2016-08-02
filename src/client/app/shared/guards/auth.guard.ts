import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import * as _ from 'lodash';

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
    let loginUser:User = this.sessionSt.retrieve('user');
      console.log(loginUser);
      if(_.isObject(loginUser)) {
        if(!this.loginService.isAuthenticated()) {
          this.loginService.setUser(loginUser);
          this.navBarService.changeToUserMenu(loginUser);
        }
        return true;
      }else {
        this.navBarService.changeToDefaultMenu();
        this.router.navigate(['/login']);
        return false;
      }
  }
}
