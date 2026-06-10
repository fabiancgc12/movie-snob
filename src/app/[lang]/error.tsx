"use client"

import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import useTranslation from "next-translate/useTranslation";

export default function Error() {
    const {t} = useTranslation("common");
    const title = t("serverErrorTitle")
    return <ErrorPageComponent title={title}/>
}
