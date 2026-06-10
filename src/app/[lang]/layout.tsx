import {ReactNode} from "react";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Providers} from "./providers";
import {Layout} from "@/components/Layout/Layout";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";

type Props = {
    children: ReactNode
    params: Promise<{ lang: string }>
}

export default async function LangLayout({children, params}: Props) {
    const {lang} = await params;
    const messages = await getMessages();
    if (!hasLocale(routing.locales, lang)) {
        notFound();
    }
    return (
        <NextIntlClientProvider locale={lang} messages={messages}>
            <Providers>
                <Layout>
                    {children}
                </Layout>
            </Providers>
        </NextIntlClientProvider>
    )
}
