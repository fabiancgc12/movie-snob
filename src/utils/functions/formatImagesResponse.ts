import { ImageMedia } from "@/models/Movies/ImageMedia.schema";

export function formatImagesResponse(images: ImageMedia) {
  // returning only the first 10 backdrops for now
  images.backdrops = images.backdrops.slice(0, 9);
  images.posters = [];
  images.logos = [];
  return images;
}
