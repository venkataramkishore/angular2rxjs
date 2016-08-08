/**
 * Resource model :: maintain resource info based on selection criteria and contract period
 */
import {ResourceType, Skill, Band, Stay, BusinessLine,
    Grade, Role, Month} from './index';

export class Resource {
    contractId: number;
    resourceType: ResourceType;
    businessLine: BusinessLine;
    skill: Skill;
    band: Band;
    role: Role;
    grade: Grade;
    stayType: Stay;
    price: number;
    onShorePrice: number;
    offShorePrice: number;
    months: Month[];
    active: number;

    constructor() {}
}

/**
 * Resource for the Application management 
 */
export class AMResource extends Resource {

    public amContractResourceId: number;
    public contractId: number;
    public resourceType: ResourceType;
    public businessLine: BusinessLine;
    public skill: Skill;
    public band: Band;
    public role: Role;
    public grade: Grade;
    public stayType: Stay;
    public price: number = 0;
    public onShorePrice: number = -1;
    public offShorePrice: number = -1;
    public months: Month[] = null;
    public active: number;

    constructor() {
        super();
    }
}

export class KTResource extends Resource {

    public ktContractResourceId: number;
    public contractId: number;
    public resourceType: ResourceType;
    public businessLine: BusinessLine;
    public skill: Skill;
    public band: Band;
    public role: Role;
    public grade: Grade;
    public stayType: Stay;
    public price: number = 0;
    public onShorePrice: number = -1;
    public offShorePrice: number = -1;
    public months: Month[] = null;
    public active: number;

    constructor( ) {
       super();
    }
}
