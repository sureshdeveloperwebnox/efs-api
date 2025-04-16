export interface ICreateCrewMember {
    organization_id: number;
    crew_id: number;
    user_id: number;
    role: string;
    created_at: string;
}

export class CreateCrewMember implements ICreateCrewMember {
    organization_id: number;
    crew_id: number;
    user_id: number;
    role: string;
    created_at: string;
    constructor (data: ICreateCrewMember) {
        this.organization_id = data.organization_id;
        this.crew_id = data.crew_id;
        this.user_id = data.user_id;
        this.role = data.role;
        this.created_at = data.created_at;
    }
}