"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/Layout/Footer";
import { NavBar } from "./NavBar";
import { Header } from "@/components/Layout/Header";
import { ShowNavBarProvider } from "@/global/ShowNavbarContext";

type props = {
  children: ReactNode;
};

export function Layout({ children }: props) {
  return (
    <div className="grid min-h-screen grid-cols-[1fr] grid-rows-[auto_1fr_auto] max-md:[grid-template-areas:'header_main_footer'] md:grid-cols-[var(--navBarWidth)_minmax(0,1fr)] md:[grid-template-areas:'nav_header''nav_main''nav_footer']">
      <ShowNavBarProvider>
        <Header className="[grid-area:header]" />
        <NavBar className="[grid-area:nav]" />
        <main className="[grid-area:main] isolate">{children}</main>
        <Footer className="[grid-area:footer]" />
      </ShowNavBarProvider>
    </div>
  );
}
