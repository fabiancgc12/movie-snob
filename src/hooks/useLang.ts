"use client";
import { useLocale } from "next-intl";
export function useLang(): string {
  return useLocale();
}
