"use client"

import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import useTranslation from "next-translate/useTranslation";

export default function TvNotFoundPage() {
    const {t} = useTranslation("movieortv")
    return <ErrorPageComponent title={t("tvNotFoundErrorMessage")}/>
}
