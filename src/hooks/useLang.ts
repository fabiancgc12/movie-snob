"use client"

import {useParams} from "next/navigation";

export function useLang(): string {
    const params = useParams()
    return (params?.lang as string) ?? "en-US"
}
