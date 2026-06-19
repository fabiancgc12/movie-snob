import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { MovieType } from "@/models/Movies/MovieType";
import { TvShowType } from "@/models/tv/TvShow.type";

type JsonLdPerson = {
  name: string;
  role: string;
  profile_path?: string | null;
};

type ProductionCompany = {
  name: string;
  logo_path?: string | null;
};

function buildCastList(cast: JsonLdPerson[]) {
  const people = cast.map((c) => ({
    "@type": "Person" as const,
    name: c.name,
    jobTitle: c.role,
    image: generateImageUrl(c.profile_path),
  }));
  const itemList = people.map((person, index) => ({
    "@type": "ListItem" as const,
    position: (index + 1).toString(),
    item: person,
  }));
  return [people, itemList] as const;
}

function buildCompanies(companies: ProductionCompany[]) {
  return companies.map((c) => ({
    "@type": "Organization" as const,
    legalName: c.name,
    logo: generateImageUrl(c.logo_path),
  }));
}

export function movieJsonLd(
  movie: MovieType,
  cast: JsonLdPerson[],
  crew: JsonLdPerson[],
) {
  const directors = crew.filter((c) => c.role.toLowerCase() === "director");
  const [castInfo, itemListElement] = buildCastList(cast);
  const productions = movie.production_companies || [];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    headline: movie.tagline,
    description: movie.overview,
    itemListElement,
    actor: castInfo,
    director: directors.map((d) => ({
      "@type": "Person",
      name: d.name,
      jobTitle: d.role,
      image: generateImageUrl(d.profile_path),
    })),
    author: directors.map((d) => ({
      "@type": "Person",
      name: d.name,
      jobTitle: d.role,
      image: generateImageUrl(d.profile_path),
    })),
    productionCompany: buildCompanies(productions),
    image: generateImageUrl(movie.poster_path, 1080),
    duration: movie.runtime,
    datePublished: movie.release_date,
  });
}

export function tvJsonLd(
  show: TvShowType,
  cast: JsonLdPerson[],
  crew: JsonLdPerson[],
) {
  const [castInfo, itemListElement] = buildCastList(cast);
  const productions = show.production_companies || [];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: show.name,
    headline: show.tagline,
    description: show.overview,
    itemListElement,
    actor: castInfo,
    author: crew.map((c) => ({
      "@type": "Person",
      name: c.name,
      jobTitle: c.role,
      image: generateImageUrl(c.profile_path),
    })),
    productionCompany: buildCompanies(productions),
    image: generateImageUrl(show.poster_path, 1080),
    timeRequired: show.episode_run_time?.at(0),
    datePublished: show.first_air_date,
  });
}
