import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * To show list of offshore resources
 * @export
 * @class OffshoreTableComponent
 * @implements {OnInit}
 * @template T
 */
@Component({
    moduleId: module.id,
    selector: 'offshore-table',
    templateUrl: 'offshore-table.component.html'
})
export class OffshoreTableComponent<T> implements OnInit {

    /**
     * list of resource as input from parent component.
     * @type {T[]}
     * @memberOf OffshoreTableComponent
     */
    @Input('resources')
    public resources:T[];

    /**
     * Event emit for deletion of selected resource.
     * @type {EventEmitter<T>}
     * @memberOf OffshoreTableComponent
     */
    @Output()
    public deleteResourceEmitter:EventEmitter<T> = new EventEmitter<T>();

    /**
     * Creates an instance of OffshoreTableComponent.
     * @memberOf OffshoreTableComponent
     */
    constructor() {
        //TODO::
    }

    /**
     * Life cycle of ng2 before init
     * @memberOf OffshoreTableComponent
     */
    ngOnInit() {
        //TODO::
    }

    /**
     * To fire event to delete selected resource.
     * @param {T} myResource
     * @memberOf OffshoreTableComponent
     */
    deleteResource( myResource:T ):void {
        this.deleteResourceEmitter.emit(myResource);
    }

     /**
      * Filtered list of offshore resources.
      * @returns {T[]}
      * @memberOf OffshoreTableComponent
      */
     getOffshoreList(): T[] {
         return _.filter(this.resources, {resourceType:{resourceType:'Offshore'}});
    }
}
