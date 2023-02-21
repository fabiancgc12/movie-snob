import {CastEntity, CrewEntity} from "@/utils/models/Movies/CreditsResponse.interface";
import {AggregateCastEntity, TvCrewEntity} from "@/utils/models/tv/TvCast.interface";
import {CreatedByEntity} from "@/utils/models/tv/TvShow.interface";

export interface CreditsDto{
    // id: number;
    cast?: (PeopleDto)[];
    crew?: (PeopleDto)[];
}

export class PeopleDto{
    id: number;
    name: string;
    type:("cast" | "crew");
    role:string;
    profile_path?: string | null;
    total_episode_count?: number | null;
    private constructor(
        id: number,
        name: string,
        type:("cast" | "crew"),
        role:string,
        profile_path?: string | null,
        total_episode_count?: number | null)
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.role = role;
        this.profile_path = profile_path;
        this.total_episode_count = total_episode_count;
    }

    static formatMovieCast(cast:CastEntity):PeopleDto{
        return new PeopleDto(cast.id,cast.name,"cast",cast.character,cast.profile_path,null)
    }

    static formatMovieCrew(crew:CrewEntity):PeopleDto{
        return new PeopleDto(crew.id,crew.name,"crew",crew.job,crew.profile_path,null)
    }

    static formatTvCast(cast:AggregateCastEntity):PeopleDto{
        const role = cast.roles?.map(r => r.character).join(",") ?? "";
        return new PeopleDto(cast.id,cast.name,"cast",role,cast.profile_path,cast.total_episode_count)
    }

    static formatTvCrew(crew:TvCrewEntity):PeopleDto{
        const role = crew.jobs?.map(j => j.job).join(",") ?? "";
        return new PeopleDto(crew.id,crew.name,"crew",role,crew.profile_path,crew.total_episode_count)
    }

    static formatCreatedBy(creator:CreatedByEntity):PeopleDto{
        return new PeopleDto(creator.id,creator.name,"crew","creator",creator.profile_path,)

    }
}