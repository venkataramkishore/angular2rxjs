export class FixedHours {
    constructor(
        public fixedcostId: string,
        public fixedcostName: string,
        public fixedcostDescription: string,
        public active:number) {

        this.fixedcostId = fixedcostId;
        this.fixedcostName = fixedcostName;
        this.fixedcostDescription = fixedcostDescription;
        this.active = active;
    }
}
