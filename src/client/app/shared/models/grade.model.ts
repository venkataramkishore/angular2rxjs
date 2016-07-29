export class Grade {
    constructor(
			public gradeId:string,
			public gradeType:string,
            public active:number
    ) {
        this.gradeId = gradeId;
        this.gradeType= gradeType;
        this.active = active;
    }
}
