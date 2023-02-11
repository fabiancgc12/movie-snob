const formatter = new Intl.DateTimeFormat("en-US",{
    day:"numeric",
    month:"long",
    year:"numeric"
})

export function formatDate(date:string){
    return formatter.format(new Date(date))
}