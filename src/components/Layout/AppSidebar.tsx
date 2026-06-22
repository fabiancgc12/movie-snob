import { Link } from "@/i18n/navigation";
import Image from "next/image";
import logo from "@public/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AppSidebarContent,
  SwitchLanguage,
} from "@/components/Layout/AppSidebar.client";

export const AppSidebar = () => {
  return (
    <Sidebar collapsible={"icon"} variant="sidebar">
      <SidebarHeader>
        <div className="w-15 h-15 rounded-xl flex items-center justify-center mx-auto">
          <Link href={`/`} className="grid place-items-center p-0">
            <Image src={logo} alt={"logo"} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className={"p-1 px-2"}>
        <AppSidebarContent />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SwitchLanguage />
        </SidebarMenuItem>
        {/*<SidebarMenuItem>*/}
        {/*  <SwitchThemeButton />*/}
        {/*</SidebarMenuItem>*/}
      </SidebarFooter>
    </Sidebar>
  );
};

// const SwitchThemeButton = () => {
//   const { setTheme } = useTheme();
//   const t = useTranslations("common");
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={(props) => (
//           <AppSidebarMenuButton {...props} title={t("theme")}>
//             <AppSidebarContent icon={Sun} text={t("theme")} />
//           </AppSidebarMenuButton>
//         )}
//       ></DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           <Sun className="size-4" />
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           <Moon className="size-4" />
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           <Monitor className="size-4" />
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
