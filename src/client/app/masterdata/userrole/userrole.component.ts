import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserRoleService } from '../../shared/services/index';
import { UserRole } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'userrole-list',
    templateUrl: 'userrole.component.html'
})
export class UserRoleComponent implements OnInit, OnDestroy {
    public userRoles$: Observable<UserRole[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private UserRoleService:UserRoleService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.userRoles$ = this.UserRoleService.fetchAllUserRoles();
        this.resSub = this.userRoles$.subscribe(
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

    private handleOnNext(userRoleList:UserRole[]) : void {
        if(_.isArray(userRoleList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('UserRole List observable completed..!!');
    }

}
