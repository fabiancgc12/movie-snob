export function formatDate(date:string,lang:string = "en-US"):string{
    const formatter = Intl.DateTimeFormat(lang,{
        day:"numeric",
        month:"long",
        year:"numeric"
    })
    return formatter.format(new Date(date))
}