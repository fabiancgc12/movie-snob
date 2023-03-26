import {Section} from "@/components/Section/Section";
import Link from "next/link";
import styles from "./notFound.module.css"
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "@/global/ThemeContext";

type props = {
    title:string
}
export function ErrorPageComponent({title}:props){
    const {t} = useTranslation("common");
    const [theme] = useTheme();
    const homeLabel = t("homeButtonLabel")
    const discoverLabel = t("discover")
    return (
        <div data-theme={theme}  className={"full-h"}>
            <Section title={title}>
                <div className={styles.links}>
                    <Link href={"/"} role={"button"}>{homeLabel}</Link>
                    <Link href={"/discover"} role={"button"} className={"secondary"}>{discoverLabel}</Link>
                </div>
            </Section>
        </div>
    )
}