export class Stay {
    constructor(
        public stayTypeId:string,
		public stayType:string,
        public active:number
    ) {
        this.stayType = stayType;
        this.stayTypeId = stayTypeId;
        this.active = active;
    }
}
