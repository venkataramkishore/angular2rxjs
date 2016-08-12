import {User, ResponseData, Contract, ResourceType,
    Role, Band, BusinessLine, FixedHours, Grade, Stay,
    OffshorePrice, OnshorePrice, Status, UserRole, Skill,
    ContractFixedHours} from '../models/index';
import * as _ from 'lodash';

export function parseUser(object: any): User {
    let user: User;
    if (_.isObject(object)  && object.hasOwnProperty('loginId')) {
        user = new User();
        user.loginId = object.loginId;
        user.userName= object.userName;
        user.firstName = object.firstName;
        user.lastName = object.lastName;
        user.role = object.role;
        user.roleId = object.roleId;
        user.lastLoginDatetime = object.lastLoginDatetime;
    } else {
        throw new Error('Not a valid user.');
    }
    return user;
}

export function parseResponse(object: any): ResponseData {
    let response: ResponseData;
    if (_.isObject(object)  && object.hasOwnProperty('successResponse')) {
        response = new ResponseData(object.successResponse, object.failureResponse, object.status);
    } else {
        throw new Error('Not a valid Response');
    }
    return response;
}

export function parseContract(object: any): Contract {
    let contract: Contract;
    if (_.isObject(object) && object.hasOwnProperty('contractId')) {
        contract = new Contract();
        contract.comments = object.comments;
        contract.companyName = object.companyName;
        contract.contractEndDate = object.contractEndDate;
        contract.contractId = object.contractId;
        contract.contractName = object.contractName;
        contract.contractStartDate = object.contractStartDate;
        contract.loginId = object.loginId;
        contract.customerName = object.customerName;
        contract.status = object.status;
        contract.statusId = object.statusId;
        contract.active = object.active;
        // contract.mStartContractDt = moment(object.contractStartDate);
        // contract.mEndContractDt = moment(object.contractEndDate);
    } else {
        throw new Error('Not a valid Contract');
    }
    return contract;
}

export function parseResourceType(object: any): ResourceType {
    let resType: ResourceType;
    if (_.isObject(object) && object.hasOwnProperty('resourcetypeId')) {
        resType = new ResourceType(object.resourcetypeId, object.resourceType, object.active);
    } else {
        throw new Error('Unable to parse Resource Type');
    }
    return resType;
}

export function parseRole(object: any): Role {
    let role: Role;
    if (_.isObject(object) && object.hasOwnProperty('roleId')) {
        role = new Role(object.roleId, object.roleType, object.active);
    } else {
        throw new Error('Unable to parse Role');
    }
    return role;
}

export function parseBusinessLine(object: any): BusinessLine {
    let bline: BusinessLine;
    if (_.isObject(object) && object.hasOwnProperty('businesslineId')) {
        bline = new BusinessLine(object.businesslineId, object.businesslineName,
            object.skillId, object.skillName,
            object.resourceTypeId, object.resourceType, object.active);
    } else {
        throw new Error('Unable to parse BusinessLine');
    }
    return bline;
}

export function parseSkill(object: any): Skill {
    let skill: Skill;
    if (_.isObject(object) && object.hasOwnProperty('skillId')) {
        skill = new Skill(object.skillId, object.skillName, object.active);
    } else {
        throw new Error('Unable to parse Skill');
    }
    return skill;
}

export function parseFixedHours(object: any): FixedHours {
    let fixedHour: FixedHours;
    if (_.isObject(object)  && object.hasOwnProperty('fixedcostId')) {
        fixedHour = new FixedHours(object.fixedcostId, object.fixedcostName, object.fixedcostDescrption, object.active);
    } else {
        throw new Error('Unable to parse FixedHours');
    }
    return fixedHour;
}

export function parseGrade(object: any): Grade {
    let grade: Grade;
    if (_.isObject(object) && object.hasOwnProperty('gradeId')) {
        grade = new Grade(object.gradeId, object.gradeType, object.active);
    } else {
        throw new Error('Unable to parse Grade');
    }
    return grade;
}

export function parseBand(object: any): Band {
    let band: Band;
    if (_.isObject(object) && object.hasOwnProperty('bandId')) {
        band = new Band(object.bandId, object.bandName, object.active);
    } else {
        throw new Error('Unable to parse Band');
    }
    return band;
}

export function parseOffshorePrice(object: OffshorePrice): OffshorePrice {
    let offPrice: OffshorePrice;

    if (_.isObject(object) && object.hasOwnProperty('offshorepriceId')) {
        offPrice = new OffshorePrice(object.offshorepriceId, object.description, object.price,
            object.businessLineId, object.businessLineName, object.bandId, object.bandName,
            object.stayTypeId, object.stayTypeName, object.lastUpdatedBy, object.active);
    } else {
        throw new Error('No price available');
    }
    return offPrice;
}

export function parseOnshorePrice(object: OnshorePrice): OnshorePrice {
    let onPrice: OnshorePrice;
    if (_.isObject(object) && object.hasOwnProperty('onshorepriceId')) {
        onPrice = new OnshorePrice(object.onshorepriceId, object.description, object.price,
            object.businessLineId, object.businessLineName, object.gradeId, object.gradeType,
            object.roleId, object.roleType, object.lastUpdatedBy, object.active);
    } else {
        throw new Error('No price available');
    }
    return onPrice;
}

export function parseStatus(object: any): Status {
    let status: Status;
    if (_.isObject(object) && object.hasOwnProperty('statusId')) {
        status = new Status(object.statusId, object.description, object.statusName, object.active);
    } else {
        throw new Error('Unable to parse Status');
    }
    return status;
}

export function parseUserRole(object: any): UserRole {
    let urole: UserRole;
    if (_.isObject(object)  && object.hasOwnProperty('userRoleId')) {
        urole = new UserRole(object.userRoleId, object.userRole, object.active);
    } else {
        throw new Error('Unable to parse UserRole');
    }
    return urole;
}

export function parseStay(object:any): Stay {
    let stay: Stay;
    if (_.isObject(object)  && object.hasOwnProperty('stayTypeId')) {
        stay = new Stay(object.stayTypeId, object.stayType, object.active);
    } else {
        throw new Error('Unable to parse UserRole');
    }
    return stay;
}

export function parseContractFixedHours(object: any): ContractFixedHours {
    let cFh:ContractFixedHours;
    if(_.isObject(object)  && object.hasOwnProperty('fixedcostId')) {
        cFh  = new ContractFixedHours();
        cFh.active = object.active;
        cFh.contractId = object.contractId;
        cFh.description = object.description;
        cFh.fixedcostId = object.fixedcostId;
        cFh.fixedcostName = object.fixedcostName;
        cFh.fixedId = object.fixedId;
        cFh.price = object.price;
    } else {
        throw new Error('Unable to parse Contract Fixed Hours');
    }
    return cFh;
}
