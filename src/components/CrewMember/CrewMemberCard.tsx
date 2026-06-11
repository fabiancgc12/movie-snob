"use client";

import Image from "next/image";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import placeholder from "../../../public/noPhotographyPlaceholder.svg";
import { PeopleDto } from "@/models/dto/Credit.dto";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type props = {
  size: "sm" | "md";
  shadow?: boolean;
  people: PeopleDto;
};

const smallStyles = "grid grid-cols-[minmax(60px,20%)_1fr] grid-areas-[profile_name_profile_description] [&_img]:rounded-lg";
const mediumStyles = "w-fit max-w-[300px] md:w-auto grid grid-cols-[minmax(100px,25%)_1fr] grid-areas-[profile_name_profile_description] [&_img]:rounded-tl-lg md:[&_img]:rounded-tl-lg md:[&_img]:rounded-tl-lg [&_.name]:text-center md:[&_.name]:text-start [&_.description]:text-center md:[&_.description]:text-start";

export function MemberCard({ people, size, shadow = true }: props) {
  const t = useTranslations("movieortv");
  const image = people.profile_path
    ? generateImageUrl(people.profile_path)
    : placeholder;
  const episodesLabel = t("totalEpisodes");
  return (
    <article
      className={cn(
        "inline-grid w-full gap-x-[5px] items-center",
        size === "sm" ? smallStyles : mediumStyles,
        !shadow && "shadow-none",
        size === "md" && "max-md:w-fit max-md:grid-cols-[minmax(100px,175px)] max-md:grid-areas-[profile_name_description] max-md:[&_img]:rounded-t-lg max-md:[&_.name]:text-center max-md:[&_.description]:text-center"
      )}
    >
      <div className="relative grid-area-[profile] aspect-[1/1.25]">
        <Image
          src={image}
          alt={`${people.name} profile`}
          fill
          className={people.profile_path ? "" : "placeholderImage"}
        />
      </div>
      <h6 className="grid-area-[name] font-bold capitalize px-2">{people.name}</h6>
      <div className="grid-area-[description] px-2">
        <p
          className={cn(
            "capitalize",
            size === "md" && "max-md:text-center md:text-start md:overflow-hidden md:[display:-webkit-box] md:[-webkit-box-orient:vertical] md:[-webkit-line-clamp:3] md:whitespace-pre-wrap"
          )}
        >
          {people.role}
        </p>
        {people.total_episode_count && (
          <p className="font-light text-sm">
            {episodesLabel}: {people.total_episode_count}
          </p>
        )}
      </div>
    </article>
  );
}
