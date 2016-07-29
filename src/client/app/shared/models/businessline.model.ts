/**
 * {businesslineId:"",businesslineName:"",resourceTypeId:"-1",skillId:"-1"}
 * Business lines information
 */
export class BusinessLine {
    constructor(
        public businesslineId:string,
        public businesslineName:string,
        public skillId:number,
        public skillName:string,
        public resourceTypeId:number,
        public resourceType:string,
        public active:number
    ) {
        this.businesslineId = businesslineId;
        this.businesslineName = businesslineName;
        this.resourceTypeId = resourceTypeId;
        this.resourceType = resourceType;
        this.skillId = skillId;
        this.skillName = skillName;
        this.active = active;
    }
}
