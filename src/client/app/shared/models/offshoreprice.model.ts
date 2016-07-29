/**
 * OffshorePrice:: refer to offshore price.
 */
export class OffshorePrice {
    constructor(
            public offshorepriceId:string,
 			public description:string,
 			public price:string,
 			public businessLineId:string,
 			public businessLineName:string,
 			public bandId:string,
 			public bandName:string,
 			public stayTypeId:string,
 			public stayTypeName:string,
 			public lastUpdatedBy:number,
            public active:number
    ) {
            this.offshorepriceId=offshorepriceId;
 			this.description=description;
 			this.price=price;
 			this.businessLineId=businessLineId;
 			this.businessLineName=businessLineName;
 			this.bandId=bandId;
 			this.bandName=bandName;
 			this.stayTypeId=stayTypeId;
 			this.stayTypeName=stayTypeName;
 			this.lastUpdatedBy=0;//:Session.sessionUser.loginId
			this.active = active;
    }
}
