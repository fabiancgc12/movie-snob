import styles from "./checkMark.module.css"
import {ActionButton} from "@/components/common/ActionButton/ActionButton";
import {StoreProductType, useCheckedButton} from "@/components/common/ActionButton/useCheckedButton";
import {FaRegBookmark,FaBookmark} from "react-icons/fa";

export type props = {
    mediaType:"movie" | "tv",
    media:StoreProductType,
    className?:string,
    size?:"xs" | "sm" | "md"
}

export function BookmarkButton(props:props){
    return <Button key={`${props.mediaType}-${props.media}`} {...props}/>
}

function Button({mediaType,media,size,className = ""}:props){
    const [checked,onClick] = useCheckedButton("checked",mediaType,media)
    return (
        <ActionButton className={`${styles.checkmark} secondary ${className}`} onClick={onClick} size={size}>
            {checked ? <FaBookmark size={24}/> : <FaRegBookmark size={24}/>}
        </ActionButton>
    )
}