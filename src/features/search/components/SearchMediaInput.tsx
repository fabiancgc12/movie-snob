"use client";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/useDebounce";
import { getSearchInfiniteQuery } from "@/features/search/queries/getSearchInfiniteQuery";
import { SearchResult } from "@/models/search/MultiSearchResponse.schema";
import { generateImageUrl } from "@/utils/functions/generateImageUrl";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import Image from "next/image";

export const SearchMediaComboBox = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const debouncedTitle = useDebounce(inputValue, 300);

  const { data, isLoading, error } = useInfiniteQuery({
    ...getSearchInfiniteQuery({ locale, title: debouncedTitle }),
    enabled: debouncedTitle.length >= 2,
  });

  const results = data?.pages?.[0]?.results?.slice(0, 5) ?? [];

  const getMediaUrl = (item: SearchResult) => {
    return `/${item.media_type}/${item.id}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      router.push(`/search?title=${encodeURIComponent(inputValue)}`);
    }
  };

  const handleSelect = (value: string | null) => {
    if (!value) return;
    const item = results.find((r) => r.id.toString() === value);
    if (item) {
      router.push(getMediaUrl(item));
    }
  };

  return (
    <Combobox value={null} onValueChange={handleSelect}>
      <ComboboxInput
        placeholder={t("searchPlaceHolder")}
        value={inputValue}
        onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
        onKeyDown={handleKeyDown}
        className="h-[45px] w-[150px] md:w-[250px] focus-within:w-[250px] transition-all duration-500"
      />
      <ComboboxContent>
        <ComboboxList>
          <RenderContent
            isLoading={isLoading}
            error={error}
            results={results}
            debouncedTitle={debouncedTitle}
          />
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

type RenderContentProps = {
  isLoading: boolean;
  error: Error | null;
  results: SearchResult[];
  debouncedTitle: string;
};

const RenderContent = ({
  isLoading,
  error,
  results,
  debouncedTitle,
}: RenderContentProps) => {
  const t = useTranslations("common");
  const getDisplayName = (item: SearchResult) => {
    return item.title || item.name || "Unknown";
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-2 text-sm text-destructive">
        {t("searchError")}
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <>
        {results.map((item) => (
          <ComboboxItem key={item.id} value={item.id.toString()}>
            <div className="flex items-center gap-3">
              {item.poster_path && (
                <div className="relative size-10 shrink-0 overflow-hidden rounded">
                  <Image
                    src={generateImageUrl(item.poster_path)}
                    alt={getDisplayName(item)}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm">{getDisplayName(item)}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {item.media_type}
                </span>
              </div>
            </div>
          </ComboboxItem>
        ))}
      </>
    );
  }

  return (
    <ComboboxEmpty>
      {debouncedTitle.length >= 2 ? t("noResults") : t("searchPlaceHolder")}
    </ComboboxEmpty>
  );
};
