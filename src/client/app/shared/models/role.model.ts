/**
 * Role of the resource
 */
export class Role {
    constructor(
        public roleId: string,
        public roleType: string,
        public active:number
    ) {
        this.roleId = roleId;
        this.roleType= roleType;
        this.active = active;
    }
}
