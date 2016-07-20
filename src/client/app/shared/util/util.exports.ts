import { User, ResponseData, Contract } from '../index';

export function parseUser (object:any) : User {
    let user:User;
    if(object) {
        user = new User();
        user.firstName = object.firstName;
        user.lastName = object.lastName;
        user.role = object.role;
        user.roleId = object.roleId;
        user.lastLoginDatetime = object.lastLoginDatetime;
    }else {
        throw new Error('Not a valid user.');
    }
   return user;
}

export function parseResponse (data:any) : ResponseData {
    let response:ResponseData;
    if(data) {
        response = new ResponseData(data.successResponse, data.failureResponse, data.status);
    }else {
        throw new Error('Not a valid Response');
    }
   return response;
}

export function parseContract(data:any): Contract {
    let contract:Contract;
    if(data) {
        contract = new Contract();
        contract.comments=data.comments;
        contract.companyName=data.companyName;
        contract.contractEndDate=data.contractEndDate;
        contract.contractId= data.contractId;
        contract.contractName=data.contractName;
        contract.contractStartDate=data.contractStartDate;
        contract.loginId=data.loginId;
        contract.customerName=data.customerName;
        contract.status=data.status;
        contract.statusId = data.statusId;
    }else {
        throw new Error('Not a valid Contract');
    }
    return contract;
}
