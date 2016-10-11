import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Contract, ContractService } from '../shared/index';

declare var jQuery:any;

/**
 * Contract list component shows list of available contracts. User can opt to do further actions on contract.
 * 
 * @export
 * @class ContractListComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    moduleId: module.id,
    selector: 'contract-list',
    templateUrl: 'contract-list.component.html'
})
export class ContractListComponent implements OnInit, OnDestroy {

    /**
     * Holds observable contract list visible on screen
     * 
     * @type {Observable<Contract[]>}
     * @memberOf ContractListComponent
     */
    public contractList$:Observable<Contract[]>;
    /**
     * Check for available of contract(s).
     * 
     * @type {boolean}
     * @memberOf ContractListComponent
     */
    public isAvailable:boolean;
    /**
     * For filtering contracts
     * 
     * @type {string}
     * @memberOf ContractListComponent
     */
    public contractFilter:string;

    /**
     * 
     * 
     * @private
     * @type {Subscription}
     * @memberOf ContractListComponent
     */
    private subscription:Subscription;
    /**
     * Creates an instance of ContractListComponent.
     * 
     * @param {Router} router
     * @param {ContractService} contractService
     * 
     * @memberOf ContractListComponent
     */
    constructor(private router:Router,
                private contractService:ContractService
                ) { }

    /**
     * Life cycle init
     * @memberOf ContractListComponent
     */
    ngOnInit() {
        this.contractList$ = this.contractService.getAllContracts();
        this.subscription =  this.contractList$.subscribe(
                                        this.handleOnNext,
                                        this.handleOnError,
                                        this.handleOnComplete
                                    );
     }

    /**
     * Life cycle destroy
     * @memberOf ContractListComponent
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
        console.log('Contract List observable unsubscribed..!!');
    }

    /**
     * 
     * 
     * @param {Contract} selContract
     * 
     * @memberOf ContractListComponent
     */
    public showContract(selContract:Contract):void {
        this.contractService.setSelectedContract(selContract);
        this.router.navigate(['/bookhours/amhours']);
    }
    /**
     * 
     * 
     * @private
     * @param {Contract[]} contractList
     * 
     * @memberOf ContractListComponent
     */
    private handleOnNext(contractList:Contract[]) : void {
        console.log(contractList);
        if(_.isObject(contractList)) {
            this.isAvailable = true;
            jQuery('[data-toggle="tooltip"]').tooltip();
        }
    }

    /**
     * @private
     * @param {*} error
     * 
     * @memberOf ContractListComponent
     */
    private handleOnError(error:any): void {
        console.log(error);
    }

    /**
     * @private
     * 
     * @memberOf ContractListComponent
     */
    private handleOnComplete(): void {
        console.log('Contract List observable completed..!!');
    }

}
