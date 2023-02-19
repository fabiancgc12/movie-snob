export interface AgregateCastResponse {
    cast?: (TvCastEntity)[] | null;
    crew?: (CrewEntity)[] | null;
    id: number;
}
export interface TvCastEntity {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string | null;
    roles?: (RolesEntity)[] | null;
    total_episode_count: number;
    order: number;
}
export interface RolesEntity {
    credit_id: string;
    character: string;
    episode_count: number;
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
    jobs?: (JobsEntity)[] | null;
    department: string;
    total_episode_count: number;
}
export interface JobsEntity {
    credit_id: string;
    job: string;
    episode_count: number;
}
