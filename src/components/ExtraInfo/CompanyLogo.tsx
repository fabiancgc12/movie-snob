import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import Image from "next/image";

type props = {
    name:string,
    logo_path?:string | null
}

export function CompanyLogo({name,logo_path}:props){
    return (
        <Image
            key={`${name} logo`}
            title={`${name} logo`}
            src={generateImageUrl(logo_path)} alt={`${name} logo`}
            className={logo_path ? "" : "placeholderImage"}
            width={50}
            height={50}
        />
    )
}