"use client";

import { Section } from "@/components/Section/Section";
import { PosterGrid } from "@/components/poster/PosterGrid";
import { useTranslations } from "next-intl";
import { SearchMediaInfiniteGrid } from "@/features/search/components/SearchMediaInfiniteGrid";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/useDebounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = {
  initialTitle: string;
};

export function SearchContent({ initialTitle }: Props) {
  const t = useTranslations("common");
  const [inputValue, setInputValue] = useState(initialTitle);
  const debouncedTitle = useDebounce(inputValue, 300);

  const onTitleChange = (title: string) => {
    setInputValue(title);
    const params = new URLSearchParams(window.location.search);
    if (title) {
      params.set("title", title);
    } else {
      params.delete("title");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const title = debouncedTitle || undefined;

  return (
    <div className={"h-full"}>
      <Section title={t("find")} className={"space-y-4"}>
        <InputGroup>
          <InputGroupAddon>
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={t("serchFor")}
            value={inputValue}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </InputGroup>
        <PosterGrid>
          <SearchMediaInfiniteGrid title={title} />
        </PosterGrid>
      </Section>
    </div>
  );
}
