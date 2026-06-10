import {ReactNode} from "react";
import {Providers} from "./providers";
import {Layout} from "@/components/Layout/Layout";

type Props = {
    children: ReactNode
    params: Promise<{ lang: string }>
}

export default async function LangLayout({children}: Props) {
    return (
        <Providers>
            <Layout>
                {children}
            </Layout>
        </Providers>
    )
}
