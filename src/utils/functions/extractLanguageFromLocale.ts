export function extractLanguageFromLocale(locale?:string | string[]){
    if (typeof locale == "string"){
        return  locale.split("-")[0]
    }
    return locale
}