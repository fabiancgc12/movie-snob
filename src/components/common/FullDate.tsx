import {AiOutlineCalendar} from "react-icons/ai";
import {formatDate} from "@/utils/functions/formatDate";

type props = {
    date:string,
    lang?:string
}
export function FullDate({date,lang = "en-Us"}:props){
    return <small className={"alignCenter"}><AiOutlineCalendar/>{date?.length > 0 ? formatDate(date,lang) : "Not available."}</small>
}