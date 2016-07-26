

/*
*Holds the user information
* {"loginId":2,"lastLoginDatetime":null,"userName":"ramkishore@gmail.com",
* "approvalFlows":[],"contracts":[],"roleId":1,"role":"Admin","firstName":"Ram","lastName":"Kishore"}
*/
export class User {

    public loginId: number;
    public lastLoginDatetime: string;
    public userName:string;
    public firstName: string;
    public lastName: string;
    public roleId: number;
    public role: string;
    public password: string;

    constructor() {
         //TODO::
    }
};

export class LoginForm {
    public userName: string;
    public password: string;

    constructor() {
        //TODO::
    }
};
