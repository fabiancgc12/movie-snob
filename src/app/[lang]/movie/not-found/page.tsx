"use client"

import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import {useTranslations} from "next-intl";

export default function MovieNotFoundPage() {
    const t = useTranslations("movieortv")
    return <ErrorPageComponent title={t("movieNotFoundErrorMessage")}/>
}
