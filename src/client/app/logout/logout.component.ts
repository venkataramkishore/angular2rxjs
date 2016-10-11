import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';

import { User } from '../shared/models/index';

/**
 * Logout user module to manage logout flow
 * @export
 * @class LogoutComponent
 * @implements {OnInit}
 */
@Component({
    moduleId: module.id,
    selector: 'log-out',
    templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {
    /**
     * Current user 
     * @type {User}
     * @memberOf LogoutComponent
     */
    public user:User;

    /**
     * Creates an instance of LogoutComponent.
     * 
     * @param {SessionStorageService} sessionSt
     * 
     * @memberOf LogoutComponent
     */
    constructor(
        private sessionSt:SessionStorageService
    ) { }

    /**
     * life cycle method of ng2 before init
     * @memberOf LogoutComponent
     */
    ngOnInit() {
        this.user = this.sessionSt.retrieve('user');
        this.sessionSt.clear('user');
     }
}
