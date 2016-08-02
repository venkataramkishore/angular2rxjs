import { Component, OnInit,OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES , Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Contract, ContractService } from '../shared/index';
import { ContractFilterPipe } from './contract.filter.pipe';

declare var jQuery:any;

@Component({
    moduleId: module.id,
    selector: 'contract-list',
    templateUrl: 'contract-list.component.html',
    directives:[ROUTER_DIRECTIVES],
    pipes: [ContractFilterPipe]
})
export class ContractListComponent implements OnInit, OnDestroy {

    public contractList$:Observable<Contract[]>;
    public isAvailable:boolean;
    public contractFilter:string;

    private subscription:Subscription;
    constructor(private contractService:ContractService,
                private router:Router) { }

    ngOnInit() {
        this.contractList$ = this.contractService.getAllContracts();
        this.subscription =  this.contractList$.subscribe(
                                        this.handleLoginOnNext,
                                        this.handleLoginOnError,
                                        this.handleLoginOnComplete
                                    );
     }

    ngOnDestroy() {
        if(!this.subscription.isUnsubscribed) {
            this.subscription.unsubscribe();
            console.log('Contract List observable unsubscribed..!!');
        }
    }

    public showContract(selContract:Contract):void {
        this.contractService.setSelectedContract(selContract);
        this.router.navigate(['/bookhours']);
    }
    private handleLoginOnNext(contractList:Contract[]) : void {
        console.log(contractList);
        if(_.isObject(contractList)) {
            this.isAvailable = true;
            jQuery('[data-toggle="tooltip"]').tooltip();
        }
    }

    private handleLoginOnError(error:any): void {
        console.log(error);
    }

    private handleLoginOnComplete(): void {
        console.log('Contract List observable completed..!!');
    }

}
