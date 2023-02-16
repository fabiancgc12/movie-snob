export interface VideoMediaResponse {
    id:      number;
    results: VideoTrailerInterface[];
}

export interface VideoTrailerInterface {
    iso_639_1:    string;
    iso_3166_1:   string;
    name:         string;
    key:          string;
    site:         string;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: string;
    id:           string;
}