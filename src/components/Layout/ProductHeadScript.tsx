export function ProductHeadScript({ jsonLd }: { jsonLd: string }) {
  return (
    <script
      id="jsonDl"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
