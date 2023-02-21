export interface ProvidersResponseInterface {
    id:      number;
    results: Results;
}

export interface Results {
    AE: CountryProviders;
    AR: CountryProviders;
    AT: CountryProviders;
    AU: CountryProviders;
    BA: CountryProviders;
    BB: CountryProviders;
    BE: CountryProviders;
    BG: CountryProviders;
    BO: CountryProviders;
    BR: CountryProviders;
    BS: CountryProviders;
    CA: CountryProviders;
    CH: CountryProviders;
    CI: CountryProviders;
    CL: CountryProviders;
    CO: CountryProviders;
    CR: CountryProviders;
    CZ: CountryProviders;
    DE: CountryProviders;
    DK: CountryProviders;
    DO: CountryProviders;
    DZ: CountryProviders;
    EC: CountryProviders;
    EG: CountryProviders;
    ES: CountryProviders;
    FI: CountryProviders;
    FR: CountryProviders;
    GB: CountryProviders;
    GF: CountryProviders;
    GH: CountryProviders;
    GQ: CountryProviders;
    GT: CountryProviders;
    HK: CountryProviders;
    HN: CountryProviders;
    HR: CountryProviders;
    HU: CountryProviders;
    ID: CountryProviders;
    IE: CountryProviders;
    IL: CountryProviders;
    IN: CountryProviders;
    IQ: CountryProviders;
    IT: CountryProviders;
    JM: CountryProviders;
    JP: CountryProviders;
    KE: CountryProviders;
    LB: CountryProviders;
    MD: CountryProviders;
    MU: CountryProviders;
    MX: CountryProviders;
    MY: CountryProviders;
    MZ: CountryProviders;
    NE: CountryProviders;
    NG: CountryProviders;
    NL: CountryProviders;
    NO: CountryProviders;
    NZ: CountryProviders;
    PA: CountryProviders;
    PE: CountryProviders;
    PH: CountryProviders;
    PL: CountryProviders;
    PS: CountryProviders;
    PT: CountryProviders;
    PY: CountryProviders;
    RO: CountryProviders;
    RS: CountryProviders;
    SA: CountryProviders;
    SC: CountryProviders;
    SE: CountryProviders;
    SG: CountryProviders;
    SI: CountryProviders;
    SK: CountryProviders;
    SN: CountryProviders;
    SV: CountryProviders;
    TH: CountryProviders;
    TR: CountryProviders;
    TW: CountryProviders;
    TZ: CountryProviders;
    UG: CountryProviders;
    US: CountryProviders;
    UY: CountryProviders;
    VE: CountryProviders;
    ZA: CountryProviders;
    ZM: CountryProviders;
}

export interface CountryProviders {
    link:     string;
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
