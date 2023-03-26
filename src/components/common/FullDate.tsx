import {AiOutlineCalendar} from "react-icons/ai";
import {formatDate} from "@/utils/functions/formatDate";
import useTranslation from "next-translate/useTranslation";

type props = {
    date:string,
    lang?:string
}
export function FullDate({date,lang = "en-Us"}:props){
    const {t} = useTranslation("common")
    const fallbackMessage = t("notAvailable")
    return <small className={"alignCenter"}><AiOutlineCalendar/>{date?.length > 0 ? formatDate(date,lang) : fallbackMessage}</small>
}