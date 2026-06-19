import { CastEntity, CrewEntity } from "@/models/Movies/CreditsResponse.schema";
import { AggregateCastEntity, TvCrewEntity } from "@/models/tv/TvCast.type";
import { CreatedByEntity } from "@/models/tv/TvShow.type";

export interface CreditsDto {
  // id: number;
  cast?: PeopleDto[];
  crew?: PeopleDto[];
}

export type PeopleDto = {
  id: number;
  name: string;
  type: "cast" | "crew";
  role: string;
  profile_path?: string | null;
  total_episode_count?: number | null;
};

export const formatMovieCast = (cast: CastEntity): PeopleDto => {
  return {
    id: cast.id,
    name: cast.name,
    type: "cast",
    role: cast.character,
    profile_path: cast.profile_path,
    total_episode_count: null,
  };
};

export const formatMovieCrew = (crew: CrewEntity): PeopleDto => {
  return {
    id: crew.id,
    name: crew.name,
    type: "crew",
    role: crew.job,
    profile_path: crew.profile_path,
    total_episode_count: null,
  };
};

export const formatTvCast = (cast: AggregateCastEntity): PeopleDto => {
  const role =
    cast.roles
      ?.map((r) => r.character)
      .slice(0, 2)
      .join(",") ?? "";
  return {
    id: cast.id,
    name: cast.name,
    type: "cast",
    role,
    profile_path: cast.profile_path,
    total_episode_count: cast.total_episode_count,
  };
};

export const formatTvCrew = (crew: TvCrewEntity): PeopleDto => {
  const role =
    crew.jobs
      ?.map((j) => j.job)
      .slice(0, 2)
      .join(",") ?? "";
  return {
    id: crew.id,
    name: crew.name,
    type: "crew",
    role,
    profile_path: crew.profile_path,
    total_episode_count: crew.total_episode_count,
  };
};

export const formatCreatedBy = (creator: CreatedByEntity): PeopleDto => {
  return {
    id: creator.id,
    name: creator.name,
    type: "crew",
    role: "creator",
    profile_path: creator.profile_path,
  };
};
