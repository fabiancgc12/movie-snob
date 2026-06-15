import { VideoMedia } from "@/models/Movies/VideoMedia.schema";

export function formatVideoResponse(videos: VideoMedia) {
  // returning only the first 9 youtube videos
  return videos?.results.filter((t) => t.site == "YouTube").slice(0, 9) || [];
}
