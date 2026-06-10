"use client"

import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";
import useTranslation from "next-translate/useTranslation";

export default function MovieNotFoundPage() {
    const {t} = useTranslation("movieortv")
    return <ErrorPageComponent title={t("movieNotFoundErrorMessage")}/>
}
