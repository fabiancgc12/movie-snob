import { getRequestConfig, RequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import esMessages from "@/../locales/es/messages.json";
import enMessages from "@/../locales/en/messages.json";

const messagesMap = {
  es: esMessages,
  en: enMessages,
};

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  if (!locale) {
    const paramValue = await rootParams.lang();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }
  return {
    locale,
    messages: messagesMap[locale],
  };
});
