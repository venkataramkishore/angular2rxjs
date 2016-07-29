/**
 * OnshorePrice:: refer to onshore price.
 */
export class OnshorePrice {
    constructor(
            public onshorepriceId:string,
 			public description:string,
 			public price:string,
 			public businessLineId:string,
 			public businessLineName:string,
 			public gradeId:string,
 			public gradeType:string,
 			public roleId:string,
 			public roleType:string,
 			public lastUpdatedBy:number,
            public active:number
    ){
            this.onshorepriceId=onshorepriceId;
 			this.description=description;
 			this.price=price;
 			this.businessLineId=businessLineId;
 			this.businessLineName=businessLineName;
 			this.gradeId=gradeId;
 			this.gradeType=gradeType;
 			this.roleId=roleId;
 			this.roleType=roleType;
 			this.lastUpdatedBy=0;//:Session.sessionUser.loginId
			this.active = active;
    }
}
