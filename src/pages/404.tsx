import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import useTranslation from "next-translate/useTranslation";

export default function Error404(){
    const {t} = useTranslation("common");
    const title = t("errorPageLabel")
    return <ErrorPageComponent title={title}/>
}