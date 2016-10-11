import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {SkillService} from '../../shared/services/index';
import {Skill} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'skill-list',
    templateUrl: 'skill.component.html'
})
export class SkillComponent implements OnInit, OnDestroy {
    public skills$: Observable<Skill[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private SkillService:SkillService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.skills$ = this.SkillService.fetchAllSkills();
        this.resSub = this.skills$.subscribe(
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

    private handleOnNext(skillList:Skill[]) : void {
        if(_.isArray(skillList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Skill List observable completed..!!');
    }

}