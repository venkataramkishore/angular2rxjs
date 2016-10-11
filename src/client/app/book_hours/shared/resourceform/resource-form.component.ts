import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

//import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {ResourceType, Skill, Band, Stay, BusinessLine,
    Grade, Role, Resource, OnshorePrice, OffshorePrice} from '../../../shared/models/index';
import { ResourceTypeService, BandService, BusinessLineService, GradeService,
        RoleService, SkillService, StayService, OnshoreService, OffshoreService } from '../../../shared/services/index';
import { AppConstant } from '../../../shared/util/index';

/**
 * Allow to select resource for the contract applicable.
 * 
 * @export
 * @class ResourceFormComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    moduleId: module.id,
    selector: 'resource-form',
    templateUrl: 'resource-form.component.html',
    styleUrls:['resource-form.component.css'],
    providers:[ResourceTypeService, BandService, BusinessLineService, GradeService,
        RoleService, SkillService, StayService, OnshoreService, OffshoreService]
})
export class ResourceFormComponent implements OnInit, OnDestroy {

    
    /**
     * Resource can be used for AM or KT resource.
     * @type {Resource}
     * @memberOf ResourceFormComponent
     */
    public resource:Resource;
    /**
     * List of available resource types.
     * @type {Observable<ResourceType[]>}
     * @memberOf ResourceFormComponent
     */
    public resourceTypes$:Observable<ResourceType[]>;
    /**
     * List of available skills.
     * @type {Observable<Skill[]>}
     * @memberOf ResourceFormComponent
     */
    public skills$:Observable<Skill[]>;
    /**
     * List of available bands.
     * @type {Observable<Band[]>}
     * @memberOf ResourceFormComponent
     */
    public bands$:Observable<Band[]>;
    /**
     * List of available stay types.
     * @type {Observable<Stay[]>}
     * @memberOf ResourceFormComponent
     */
    public stays$:Observable<Stay[]>;
    /**
     * List of available business lines.
     * @type {Observable<BusinessLine[]>}
     * @memberOf ResourceFormComponent
     */
    public blines$:Observable<BusinessLine[]>;
    /**
     * List of available grades.
     * @type {Observable<Grade[]>}
     * @memberOf ResourceFormComponent
     */
    public grades$:Observable<Grade[]>;
    /**
     * List of available roles.
     * @type {Observable<Role[]>}
     * @memberOf ResourceFormComponent
     */
    public roles$:Observable<Role[]>;
    /**
     * Automated price value based on criteria selection for a type of resource.
     * @type {number}
     * @memberOf ResourceFormComponent
     */
    public price:number = 0;

    /**
     * Enable functionality button based on successful form completion.
     * @type {boolean}
     * @memberOf ResourceFormComponent
     */
    public enableAddBtn:boolean= false;
    
    /**
     * List of errors during form submission.
     * @type {Array<string>}
     * @memberOf ResourceFormComponent
     */
    public errorList:Array<string>;

    /**
     * An event to communicate to parent component.
     * AMHours or KTHours
     * @type {EventEmitter<Resource>}
     * @memberOf ResourceFormComponent
     */
    @Output()
    public addResourceEvent:EventEmitter<Resource> = new EventEmitter<Resource>();

    //subscriptions of all observables to unsubscribe
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private resTypeSub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private skillSub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private blineSub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private bandSub$:Subscription;
    /**
     * 
     * 
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private gradeSub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private roleSub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private staySub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private onShoreSub$:Subscription;
    /**
     * @private
     * @type {Subscription}
     * @memberOf ResourceFormComponent
     */
    private offShoreSub$:Subscription;

    /**
     * Creates an instance of ResourceFormComponent.
     * 
     * @param {ResourceTypeService} resTypeService
     * @param {RoleService} roleService
     * @param {GradeService} gradeService
     * @param {BandService} bandService
     * @param {BusinessLineService} blineService
     * @param {SkillService} skillService
     * @param {StayService} stayServce
     * @param {OnshoreService} onShoreService
     * @param {OffshoreService} offShoreServce
     * 
     * @memberOf ResourceFormComponent
     */
    constructor(private resTypeService:ResourceTypeService,
                private roleService:RoleService,
                private gradeService:GradeService,
                private bandService:BandService,
                private blineService:BusinessLineService,
                private skillService:SkillService,
                private stayServce:StayService,
                private onShoreService:OnshoreService,
                private offShoreServce:OffshoreService) {
        this.resource = new Resource();
    }

    /**
     * Life cycle of ng2 to init component
     * @memberOf ResourceFormComponent
     */
    ngOnInit() {
        this.resourceTypes$ = this.resTypeService.fetchAllResourceTypes();
        this.roles$ = this.roleService.fetchAllRoles();
        this.grades$ = this.gradeService.fetchAllGrades();
        this.bands$ = this.bandService.fetchAllBands();
        this.skills$ = this.skillService.fetchAllSkills();
        //this.blines$ = this.blineService.fetchAllBusinessLines();
        this.stays$ = this.stayServce.fetchAllStays();
    }

    /**
     * life cycly of ng2 calls before destroy component.
     * @memberOf ResourceFormComponent
     */
    ngOnDestroy() {
        if(this.bandSub$) {
            this.bandSub$.unsubscribe();
        }
        if(this.blineSub$) {
            this.blineSub$.unsubscribe();
        }
        if(this.skillSub$) {
            this.skillSub$.unsubscribe();
        }
        if(this.resTypeSub$) {
            this.resTypeSub$.unsubscribe();
        }
        if(this.gradeSub$) {
            this.gradeSub$.unsubscribe();
        }
        if(this.roleSub$) {
            this.roleSub$.unsubscribe();
        }
        if(this.staySub$) {
            this.staySub$.unsubscribe();
        }
        if(this.onShoreSub$) {
            this.onShoreSub$.unsubscribe();
        }
        if(this.offShoreSub$) {
            this.offShoreSub$.unsubscribe();
        }
    }


    /**
     * Handle resource type change.
     * @memberOf ResourceFormComponent
     */
    resourceTypeChange():void {
        console.log(this.resource+ ' <> ' + this.resource.resourceType);
        if(_.isObject(this.resource.resourceType)) {
            switch (this.resource.resourceType.resourceType) {
                case AppConstant.ONSHORE:
                    this.blines$ = this.blineService.fetchBusinessLinesOnResourceType(this.resource.resourceType.resourcetypeId);
                    this.blines$.catch(this.handleOnError.bind(this));

                    break;
                default:
                    break;
            }
        }
    }

    /**
     * Handle skill change.
     * @memberOf ResourceFormComponent
     */
    skillChange():void {
        console.log(this.resource);
        if(this.resource.resourceType.resourceType ===AppConstant.OFFSHORE && _.isObject(this.resource.skill)) {
            this.blines$ = this.blineService.fetchBusinessLinesOnResourceTypeAndSkill(
                                            this.resource.resourceType.resourcetypeId,
                                            this.resource.skill.skillId);
            this.blines$.catch(this.handleOnError.bind(this));
        }
    }

    /**
     * Fetch price based on form selection.
     * @memberOf ResourceFormComponent
     */
    fetchPrice():void {
        this.errorList = [];
        if( _.isEqual(this.resource.resourceType.resourceType, AppConstant.ONSHORE)) {
            this.enableAddBtn= false;
            if(_.isObject(this.resource.businessLine) && _.isObject(this.resource.role) && _.isObject(this.resource.grade)) {
                this.onShoreSub$ = this.onShoreService.fetchPrice(this.resource).subscribe(
                    (onShorePrice:OnshorePrice)=> {
                        	this.resource.onShorePrice = _.toNumber(onShorePrice.onshorepriceId);
                            this.resource.price = _.toNumber(onShorePrice.price);
                            this.resource.offShorePrice = -1;
                            this.enableAddBtn= true;
                    }, this.handleOnError.bind(this)
                );
            }else {
                this.errorList.push('All fields are mandatory');
            }
        }else if ( _.isEqual(this.resource.resourceType.resourceType, AppConstant.OFFSHORE)) {
            this.enableAddBtn= false;
            if(_.isObject(this.resource.skill) && _.isObject(this.resource.businessLine)
                && _.isObject(this.resource.band) && _.isObject(this.resource.stayType)) {
                this.offShoreSub$ = this.offShoreServce.fetchPrice(this.resource).subscribe(
                    (offShorePrice:OffshorePrice)=> {
                        this.resource.offShorePrice = _.toNumber(offShorePrice.offshorepriceId);
                        this.resource.price = _.toNumber(offShorePrice.price);
                        this.resource.onShorePrice = -1;
                        this.enableAddBtn= true;
                    }, this.handleOnError.bind(this)
                );
            }else {
                this.errorList.push('All fields are mandatory');
            }
        }else {
            this.enableAddBtn= false;
            this.errorList.push('Select Resource Type');
        }
    }

    /**
     * Emit resource object to the parent expected.
     * @memberOf ResourceFormComponent
     */
    addResource():void {
        this.addResourceEvent.emit(this.resource);
        this.resource = new Resource();
        this.enableAddBtn = false;
    }

    /**
     * Handle error messages internally
     * @private
     * @param {*} error
     * 
     * @memberOf ResourceFormComponent
     */
    private handleOnError(error:any): void {
        this.errorList.push(error.statusText || error.message);
        console.log(this.errorList);
    }
}
