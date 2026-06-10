"use client"

import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import {useTranslations} from "next-intl";

export default function NotFound() {
    const t = useTranslations("common");
    const title = t("errorPageLabel")
    return <ErrorPageComponent title={title}/>
}
