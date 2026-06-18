import Image from "next/image";
import wideLogo from "@public/logo-wide.png";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";

import { SearchMediaComboBox } from "@/features/search/components/SearchMediaInput";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-9 flex items-center justify-between gap-2.5 bg-(--primaryDarker-90) p-2.5 backdrop-blur-[5px]",
      )}
    >
      <SidebarTrigger className="grid place-items-center rounded-full border-0 bg-transparent outline-0 md:hidden" />

      <div className="relative h-10 aspect-[2.4/1] md:hidden">
        <Link href={`/`} className="grid place-items-center p-0">
          <Image src={wideLogo} alt={"wide logo"} fill />
        </Link>
      </div>
      <div className={"ml-auto"}>
        <SearchMediaComboBox />
      </div>
    </header>
  );
}
