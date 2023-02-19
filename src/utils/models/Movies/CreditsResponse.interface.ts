export interface CreditsResponseInterface {
    id: number;
    cast?: (CastEntity)[] | null;
    crew?: (CrewEntity)[] | null;
}
export interface CastEntity {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
export interface CrewEntity {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    credit_id: string;
    department: string;
    job: string;
}

export type CrewDto = Pick<CrewEntity, "id" | "job" | "name" | "profile_path">