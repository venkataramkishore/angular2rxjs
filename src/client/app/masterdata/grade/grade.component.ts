import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {GradeService} from '../../shared/services/index';
import {Grade} from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'grade-list',
    templateUrl: 'grade.component.html'
})
export class GradeComponent implements OnInit, OnDestroy {
    public grades$: Observable<Grade[]>;
    public isAvailable: boolean;
    public errorMsg: string;

    private resSub: Subscription;

    constructor(private gradeService:GradeService) {}

    ngOnInit() {
        this.isAvailable = false;
        this.grades$ = this.gradeService.fetchAllGrades();
        this.resSub = this.grades$.subscribe(
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

    private handleOnNext(gradeList:Grade[]) : void {
        if(_.isArray(gradeList)) {
            this.isAvailable = true;
        }
    }

    private handleOnError(error:any): void {
        this.errorMsg = error.message || error.statusText;
        console.log(error);
        this.isAvailable = false;
    }

    private handleOnComplete(): void {
        console.log('Grade List observable completed..!!');
    }

}