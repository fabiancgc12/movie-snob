export type ImageMediaResponse = {
  backdrops: ImagePoster[];
  id: number;
  logos: ImagePoster[];
  posters: ImagePoster[];
};

export type ImagePoster = {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};
