import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {ResourceType, Skill, Band, Stay, BusinessLine,
    Grade, Role, Resource, OnshorePrice, OffshorePrice} from '../../../shared/models/index';
import {ResourceTypeService, BandService, BusinessLineService, GradeService,
        RoleService, SkillService, StayService, OnshoreService, OffshoreService} from '../../../shared/services/index';
import { AppConstant } from '../../../shared/util/index';

@Component({
    moduleId: module.id,
    selector: 'resource-form',
    templateUrl: 'resource-form.component.html',
    styleUrls:['resource-form.component.css'],
    providers:[ResourceTypeService, BandService, BusinessLineService, GradeService,
        RoleService, SkillService, StayService, OnshoreService, OffshoreService]
})
export class ResourceFormComponent implements OnInit, OnDestroy {

    //input data
    public resource:Resource;
    public resourceTypes$:Observable<ResourceType[]>;
    public skills$:Observable<Skill[]>;
    public bands$:Observable<Band[]>;
    public stays$:Observable<Stay[]>;
    public blines$:Observable<BusinessLine[]>;
    public grades$:Observable<Grade[]>;
    public roles$:Observable<Role[]>;
    public price:number = 0;

    //Handle error and ui
    public enableAddBtn:boolean= false;
    public errorList:Array<string>;

    //for emitting resource info to parent
    @Output()
    public addResourceEvent:EventEmitter<Resource> = new EventEmitter<Resource>();

    //subscriptions of all observables to unsubscribe
    private resTypeSub$:Subscription;
    private skillSub$:Subscription;
    private blineSub$:Subscription;
    private bandSub$:Subscription;
    private gradeSub$:Subscription;
    private roleSub$:Subscription;
    private staySub$:Subscription;
    private onShoreSub$:Subscription;
    private offShoreSub$:Subscription;

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

    ngOnInit() {
        this.resourceTypes$ = this.resTypeService.fetchAllResourceTypes();
        this.roles$ = this.roleService.fetchAllRoles();
        this.grades$ = this.gradeService.fetchAllGrades();
        this.bands$ = this.bandService.fetchAllBands();
        this.skills$ = this.skillService.fetchAllSkills();
        //this.blines$ = this.blineService.fetchAllBusinessLines();
        this.stays$ = this.stayServce.fetchAllStays();
    }

    ngOnDestroy() {
        if(this.bandSub$ && !this.bandSub$.isUnsubscribed) {
            this.bandSub$.unsubscribe();
        }
        if(this.blineSub$ && !this.blineSub$.isUnsubscribed) {
            this.blineSub$.unsubscribe();
        }
        if(this.skillSub$ && !this.skillSub$.isUnsubscribed) {
            this.skillSub$.unsubscribe();
        }
        if(this.resTypeSub$ && !this.resTypeSub$.isUnsubscribed) {
            this.resTypeSub$.unsubscribe();
        }
        if(this.gradeSub$ && !this.gradeSub$.isUnsubscribed) {
            this.gradeSub$.unsubscribe();
        }
        if(this.roleSub$ && !this.roleSub$.isUnsubscribed) {
            this.roleSub$.unsubscribe();
        }
        if(this.staySub$ && !this.staySub$.isUnsubscribed) {
            this.staySub$.unsubscribe();
        }
        if(this.onShoreSub$ && !this.onShoreSub$.isUnsubscribed) {
            this.onShoreSub$.unsubscribe();
        }
        if(this.offShoreSub$ && !this.offShoreSub$.isUnsubscribed) {
            this.offShoreSub$.unsubscribe();
        }
    }

    /**
     * handle resource type change to fetch business lines
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
     * Handle skill change to fetch business lines
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
     * fetch price for the respective resource
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
     */
    addResource():void {
        this.addResourceEvent.emit(this.resource);
        this.resource = new Resource();
        this.enableAddBtn = false;
    }

    /**
     * Handle error messages internally
     */
    private handleOnError(error:any): void {
        this.errorList.push(error.statusText || error.message);
        console.log(this.errorList);
    }
}
