import {ImageMediaResponse} from "@/utils/models/Movies/ImageMedia.interface";

export function formatImagesResponse(images:ImageMediaResponse){
    // returning only the first 10 backdrops for now
    images.backdrops = images.backdrops.slice(0,9);
    images.posters = [];
    images.logos = [];
    return images;
}