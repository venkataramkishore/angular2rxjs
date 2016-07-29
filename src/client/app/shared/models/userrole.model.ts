/**
 * User role registered or admin.
 */
export class UserRole {

    constructor (
			public userRoleId:string,
			public userRole:string,
            public active:number
            ) {
                this.userRole = userRole;
                this.userRoleId = userRoleId;
                this.active = active;
    }
}
