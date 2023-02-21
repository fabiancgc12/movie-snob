import {VideoMediaResponse} from "@/utils/models/Movies/VideoMedia.interface";

export function formatVideoResponse(videos:VideoMediaResponse){
    // returning only the first 9 youtube videos
    return videos.results.filter(t => t.site == "YouTube").slice(0,9)
}