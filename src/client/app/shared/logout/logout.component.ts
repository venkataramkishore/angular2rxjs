import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';

import { User } from '../models/index';

@Component({
    moduleId: module.id,
    selector: 'log-out',
    templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {
    public user:User;

    constructor(
        private sessionSt:SessionStorageService
    ) { }

    ngOnInit() {
        this.user = this.sessionSt.retrieve('user');
        this.sessionSt.clear('user');
     }
}
