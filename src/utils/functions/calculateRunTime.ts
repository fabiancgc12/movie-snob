export function calculateRunTime(runtime:number){
    const date = new Date(0,0,0,0,runtime)
    // const date = new Date(runtime*1000)
    return `${date.getHours()}h ${date.getMinutes()}m`
}
