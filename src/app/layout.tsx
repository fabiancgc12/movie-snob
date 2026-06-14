import "react-tabs/style/react-tabs.css";
import "@/styles/globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Movie Snob",
  description: "Search for your favorite movies and tv shows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("dark font-sans", figtree.variable)} lang="en">
      <body>{children}</body>
    </html>
  );
}
