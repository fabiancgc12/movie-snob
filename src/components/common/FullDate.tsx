import {AiOutlineCalendar} from "react-icons/ai";
import {formatDate} from "@/utils/functions/formatDate";

type props = {
    date:string
}
export function FullDate({date}:props){
    return <small className={"alignCenter"}><AiOutlineCalendar/>{date?.length > 0 ? formatDate(date) : "Not available."}</small>
}