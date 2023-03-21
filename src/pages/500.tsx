import {ErrorPageComponent} from "@/components/notFound/ErrorPageComponent";

export default function Custom500() {
    return <ErrorPageComponent title={"there was an error on the server"}/>;
}