export interface ProvidersResponseInterface {
    results: ProvidersLanguage;
}

export interface ProvidersLanguage {
    US: AE;
}

export interface AE {
    link:      string;
    flatrate?: Provider[];
    buy:       Provider[];
    rent?:     Provider[];
    ads?:      Provider[];
    free?:     Provider[];
}

export interface Provider {
    logo_path:        string;
    provider_id:      number;
    provider_name:    string;
    display_priority: number;
}