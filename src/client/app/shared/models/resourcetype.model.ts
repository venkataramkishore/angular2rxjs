export class ResourceType {
    constructor(
            public resourcetypeId:string,
	        public resourceType:string,
            public active:number) {
                    this.resourceType = resourceType;
                    this.resourcetypeId = resourcetypeId;
                    this.active = active;
    }
}
