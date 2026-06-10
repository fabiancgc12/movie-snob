"use client"

import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import {useTranslations} from "next-intl";

export default function Error() {
    const t = useTranslations("common");
    const title = t("serverErrorTitle")
    return <ErrorPageComponent title={title}/>
}
