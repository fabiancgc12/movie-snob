import { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Figtree } from "next/font/google";
import "@/styles/globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: "Movie Snob",
  description: "Search for your favorite movies and tv shows",
};

type Props = {
  children: ReactNode;
};

export default async function LangLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html className={cn("dark font-sans", figtree.variable)} lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="min-h-screen bg-background">
              <SidebarProvider>
                <AppSidebar />
                <div className="min-h-screen grid grid-rows-[auto_1fr_auto] flex-1 min-w-0">
                  <Header />
                  <main className="isolate min-w-0">{children}</main>
                  <Footer />
                </div>
              </SidebarProvider>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
