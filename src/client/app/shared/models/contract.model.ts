import * as mom from 'moment';
export class Contract {

    public contractId:number;
	public comments:string;
	public companyName:string;
	public contractName:string;
	public contractStartDate:string;
	public contractEndDate:Date;
	public contractCreatedDatetime:Date;
	public contractModifiedDateTime:Date;
	public customerName:string;
	public loginId:number;
	public statusId:number;
	public status:string;
    public active:number;
	public mStartContractDt:mom.Moment;
	public mEndContractDt:mom.Moment;
    constructor() {
        //TODO::
    }
}
