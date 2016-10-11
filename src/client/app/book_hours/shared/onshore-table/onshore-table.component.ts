import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * To show list of onshore resources.
 * @export
 * @class OnshoreTableComponent
 * @implements {OnInit}
 * @template T
 */
@Component({
    moduleId: module.id,
    selector: 'onshore-table',
    templateUrl: 'onshore-table.component.html'
})
export class OnshoreTableComponent<T> implements OnInit {

    /**
     * Expected list of resources from parent.
     * @type {T[]}
     * @memberOf OnshoreTableComponent
     */
    @Input('resources')
    public resources:T[];

    /**
     * Used for event emitting to parent
     * @type {EventEmitter<T>}
     * @memberOf OnshoreTableComponent
     */
    @Output()
    public deleteResourceEmitter:EventEmitter<T> = new EventEmitter<T>();

    /**
     * Creates an instance of OnshoreTableComponent.
     * @memberOf OnshoreTableComponent
     */
    constructor() {
        //TODO::
    }

    /**
     * Life cycle of ng2 before initialise
     * @memberOf OnshoreTableComponent
     */
    ngOnInit() {
        //TODO::
    }

    /**
     * Fire an event on deletion of resource.
     * @param {T} myResource
     * 
     * @memberOf OnshoreTableComponent
     */
    deleteResource( myResource:T ):void {
        this.deleteResourceEmitter.emit(myResource);
    }

    /**
     * Filtered list of onshore resources 
     * @returns {T[]}
     * @memberOf OnshoreTableComponent
     */
    getOnshoreList(): T[] {
        return _.filter(this.resources, {resourceType: {resourceType:'Onshore'}});
    }
}
