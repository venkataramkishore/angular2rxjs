/**
 * Skill of each resource
 */
export class Skill {
    constructor(
        public skillId: string,
        public skillName: string,
        public active:number
    ) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.active = active;
    }
}
