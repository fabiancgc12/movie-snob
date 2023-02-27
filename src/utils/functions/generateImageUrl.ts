import placeholderImage from "../../../public/noPhotographyPlaceholder.svg"

export function generateImageUrl(path:string | undefined | null,quality:number = 500):string {
    if (!path) return placeholderImage
    return `https://image.tmdb.org/t/p/w${quality}${path}`
}
