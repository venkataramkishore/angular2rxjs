import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import * as _ from 'lodash';

import {SessionStorageService} from 'ng2-webstorage';
import {User} from '../models/index';

import {LoginService, NavbarService} from '../index';

/**
 * Auth Guard, enable for only authorized user
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
    /**
     * Current user.
     * @type {User}
     * @memberOf AuthGuard
     */
    public activeUser:User;
    /**
     * Allow route for the current user.
     * @type {boolean}
     * @memberOf AuthGuard
     */
    public allowRoute:boolean = false;
    /**
     * Creates an instance of AuthGuard.
     * 
     * @param {LoginService} loginService
     * @param {NavbarService} navBarService
     * @param {SessionStorageService} sessionSt
     * @param {Router} router
     * 
     * @memberOf AuthGuard
     */
    constructor(private loginService: LoginService,
                private navBarService:NavbarService,
                private sessionSt:SessionStorageService,
                private router: Router) {}

  /**
   * To Validate user authentication.
   * @returns boolean
   * 
   * @memberOf AuthGuard
   */
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
