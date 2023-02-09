export interface ImageMediaInterface {
    backdrops: ImagePoster[];
    id:        number;
    logos:     ImagePoster[];
    posters:   ImagePoster[];
}

export interface ImagePoster {
    aspect_ratio: number;
    height:       number;
    iso_639_1:    null | string;
    file_path:    string;
    vote_average: number;
    vote_count:   number;
    width:        number;
}