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
import { MemberCard } from "@/components/CrewMember/CrewMemberCard";
import { CrewSection } from "@/components/CrewSection/CrewSection";

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lang } = await params;
  try {
    const { movie } = await getMovie(Number(id), lang);
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
        locale: "en_US",
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
  const { id, lang } = await params;
  try {
    const { movie, credits, videos, images, providers, recommendations } =
      await getMovie(Number(id), lang);
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
        <MediaBanner product={movie} trailer={trailer} mediaType={"movie"} />
        <div className="flex flex-col md:grid md:grid-cols-[75%_1fr] md:[&>*:nth-child(n+3)]:col-span-full">
          <CrewSection crew={crew} />
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

export const revalidate = 900;

function movieJsonLd(movie: any, cast: any[], crew: any[]) {
  const directors = crew.filter(
    (a: any) => a.role.toLowerCase() === "director",
  );
  const productions = movie.production_companies || [];
  const castInfo = cast.map((a: any) => ({
    "@type": "Person",
    name: a.name,
    jobTitle: a.role,
    image: generateImageUrl(a.profile_path),
  }));
  const itemListElement = castInfo.map((cast: any, index: number) => ({
    "@type": "ListItem",
    position: (index + 1).toString(),
    item: cast,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    headline: movie.tagline,
    description: movie.overview,
    itemListElement,
    actor: castInfo,
    director: directors.map((d: any) => ({
      "@type": "Person",
      name: d.name,
      jobTitle: d.role,
      image: generateImageUrl(d.profile_path),
    })),
    author: directors.map((d: any) => ({
      "@type": "Person",
      name: d.name,
      jobTitle: d.role,
      image: generateImageUrl(d.profile_path),
    })),
    productionCompany: productions.map((p: any) => ({
      "@type": "Organization",
      legalName: p.name,
      logo: generateImageUrl(p.logo_path),
    })),
    image: generateImageUrl(movie.poster_path, 1080),
    duration: movie.runtime,
    datePublished: movie.release_date,
  };
  return JSON.stringify(structuredData);
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
