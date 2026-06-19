import { getTvShow } from "@/services/tv/getTv";

import { CastSection } from "@/components/CastSection/CastSection";
import { MediaBanner } from "@/components/ProductBanner/ProductBanner";
import { TvExtraInfo } from "@/components/ExtraInfo/TvExtraInfo";
import { SeasonsList } from "@/components/Seasons/SeasonsList";
import { Media } from "@/components/media/Media";
import { SliderSection } from "@/components/Slider/SliderSection";
import { TMDBCodes } from "@/utils/TMDBCodes";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { formatCreatedBy, PeopleDto } from "@/models/dto/Credit.dto";
import { ProductHeadScript } from "@/components/Layout/ProductHeadScript";
import { PosterList } from "@/components/poster/posterList";
import { tvJsonLd } from "@/services/jsonLd";

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lang } = await params;
  try {
    const { show } = await getTvShow(Number(id), lang);
    const title = `${show.name} - Movie Snob`;

    return {
      title,
      openGraph: {
        title,
        description: show.overview,
        images: [
          {
            url: generateImageUrl(show.backdrop_path, 1280),
            alt: `${show.name} poster backdrop`,
          },
        ],
        siteName: "Movie Snob",
        type: "video.other" as const,
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  } catch {
    return { title: "TV Show - Movie Snob" };
  }
}

export default async function TvPage({ params }: Props) {
  const { id, lang } = await params;
  try {
    const { show, credits, videos, recommendations, images, providers } =
      await getTvShow(Number(id), lang);
    const crew =
      show.created_by
        ?.map((c) => serializePeople(formatCreatedBy(c)))
        .slice(0, 2) || [];
    const cast = credits.cast?.map(serializePeople);
    const openingSequence = videos.find((v) => v.type.includes("Opening"));
    const jsonLd = tvJsonLd(show, cast || [], crew);

    return (
      <>
        <ProductHeadScript jsonLd={jsonLd} />
        <MediaBanner
          product={show}
          crew={crew}
          trailer={openingSequence}
          mediaType={"tv"}
        />
        <div className="flex flex-col md:grid md:grid-cols-[75%_1fr] md:[&>*:nth-child(n+4)]:col-span-full">
          <CastSection cast={cast} />
          <div className="order-10 md:order-none">
            <TvExtraInfo show={show} providers={providers} />
          </div>
          <SeasonsList seasons={show.seasons} />
          <Media videos={videos} images={images} />
        </div>
        <SliderSection title={"Recommendations"} speed={450}>
          <PosterList
            mediaType={"tv"}
            media={recommendations}
            fallbackMessage={"No recommendations available."}
          />
        </SliderSection>
      </>
    );
  } catch (e: any) {
    if (e?.status_code == TMDBCodes.resourceNotFound) {
      notFound();
    }
    throw e;
  }
}

export const revalidate = 900;

function serializePeople(p: PeopleDto) {
  return {
    id: p.id,
    name: p.name,
    type: p.type,
    role: p.role,
    profile_path: p.profile_path,
    total_episode_count: p.total_episode_count,
  };
}
