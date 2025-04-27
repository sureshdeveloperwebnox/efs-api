export interface ICreateCrewMember {
    organization_id: number;
    crew_id: number;
    user_id: number;
    role: string;
    date_time: string;
}

export class CreateCrewMember implements ICreateCrewMember {
    organization_id: number;
    crew_id: number;
    user_id: number;
    role: string;
    date_time: string;
    constructor (data: ICreateCrewMember) {
        this.organization_id = data.organization_id;
        this.crew_id = data.crew_id;
        this.user_id = data.user_id;
        this.role = data.role;
        this.date_time = data.date_time;
    }
}