export function generateImageUrl(path:string,quality:number = 500) {
    return `https://image.tmdb.org/t/p/w${quality}${path}`
}
