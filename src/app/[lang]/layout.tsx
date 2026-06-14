import { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const messages = await getMessages();
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <Providers>
        <div className="min-h-screen bg-background">
          <SidebarProvider>
            <AppSidebar />
            <div className="min-h-screen grid-rows-[auto_1fr_auto] flex-1 min-w-0">
              <Header />
              <main className="isolate">{children}</main>
              <Footer />
            </div>
          </SidebarProvider>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
