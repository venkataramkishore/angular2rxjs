/**
 * Status of the contract
 */
export class Status {
    constructor(
        public statusId: string,
        public description: string,
        public statusName: string,
        public active:number
    ) {
        this.description = description;
        this.statusId = statusId;
        this.statusName = statusName;
        this.active = active;
    }
}
