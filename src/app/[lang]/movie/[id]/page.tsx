import { getMovie } from "@/services/movies/getMovie";

import { CastSection } from "@/components/CastSection/CastSection";
import { MediaBanner } from "@/components/ProductBanner/ProductBanner";
import { MovieExtraInfo } from "@/components/ExtraInfo/MovieExtraInfo";
import { Media } from "@/components/media/Media";
import { SliderSection } from "@/components/Slider/SliderSection";
import { TMDBCodes } from "@/utils/TMDBCodes";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { PeopleDto } from "@/models/dto/Credit.dto";
import { ProductHeadScript } from "@/components/Layout/ProductHeadScript";
import { PosterList } from "@/components/poster/posterList";
import { movieJsonLd } from "@/services/jsonLd";
import { getLocale } from "next-intl/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  try {
    const { movie } = await getMovie(Number(id), locale);
    const title = `${movie.title} - Movie Snob`;

    return {
      title,
      description: movie.overview,
      openGraph: {
        title,
        description: movie.overview,
        images: [
          {
            url: generateImageUrl(movie.backdrop_path, 1280),
            alt: `${movie.title} poster backdrop`,
          },
        ],
        siteName: "Movie Snob",
        type: "video.other" as const,
        locale: locale === "es" ? "es_ES" : "en_US",
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  } catch {
    return { title: "Movie - Movie Snob" };
  }
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  try {
    const { movie, credits, videos, images, providers, recommendations } =
      await getMovie(Number(id), locale);
    const crew = credits.crew
      ?.sort((a) => (a.role.toLowerCase() === "screenplay" ? 1 : -1))
      .map(serializePeople);
    const cast = credits.cast?.map(serializePeople);
    const trailer = videos.find(
      (t) => t.site == "YouTube" && t.name.toLowerCase().includes("trailer"),
    );
    const jsonLd = movieJsonLd(movie, cast || [], crew || []);

    return (
      <>
        <ProductHeadScript jsonLd={jsonLd} />
        <MediaBanner
          product={movie}
          trailer={trailer}
          mediaType={"movie"}
          crew={crew}
        />
        <div className="flex flex-col md:grid md:grid-cols-[75%_1fr] md:[&>*:nth-child(n+3)]:col-span-full">
          <CastSection cast={cast} />
          <MovieExtraInfo movie={movie} providers={providers} />
          <Media videos={videos} images={images} />
        </div>
        <SliderSection title={"Recommendations"} speed={450}>
          <PosterList
            mediaType={"movie"}
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
