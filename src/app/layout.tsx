import "@picocss/pico";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tabs/style/react-tabs.css";
import "@/styles/globals.css";

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
    <html>
      <body data-theme="dark">{children}</body>
    </html>
  );
}
