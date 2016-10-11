import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {RoleService} from '../../shared/services/index';
import {Role} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'role-list',
    templateUrl: 'role.component.html'
})
export class RoleComponent implements OnInit, OnDestroy {
    public roles$: Observable<Role[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private roleService:RoleService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.roles$ = this.roleService.fetchAllRoles();
        this.resSub = this.roles$.subscribe(
                                        this.handleOnNext.bind(this),
                                        this.handleOnError.bind(this),
                                        this.handleOnComplete
        );
    }

    ngOnDestroy() {
        if(this.resSub) {
            this.resSub.unsubscribe();
        }
    }

    private handleOnNext(roleList:Role[]) : void {
        if(_.isArray(roleList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Role List observable completed..!!');
    }

}