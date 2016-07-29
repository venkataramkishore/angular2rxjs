/**
 * band info
 */
export class Band {
    constructor(
        public bandId:number,
        public bandName:string,
        public active:number
    ) {
        this.bandId = bandId;
        this.bandName = bandName;
        this.active = active;
    }
}